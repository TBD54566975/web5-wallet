import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from "react-native";
import { Loader } from "../../components/Loader";
import { useMount } from "../../hooks/useMount";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import type { ConnectRequest } from "../../types/models";
import type { AppNavigatorProps } from "../../types/navigation";
import { useIdentityListQuery } from "../identity/hooks";
import { useProfilesQuery } from "../profile/hooks";
import { ConnectSuite } from "./connect-suite";
import { Button } from "../../components/Button";
import {
  type CheckList,
  ProfileSelectChecklist,
} from "../profile/components/ProfileSelectChecklist";

type Props = AppNavigatorProps<"ConnectProfileSelectScreen">;
export const ConnectProfileSelectScreen = ({ navigation, route }: Props) => {
  const [decryptedConnectionRequest, setDecryptedConnectionRequest] =
    useState<ConnectRequest>();
  const [checkList, setCheckList] = useState<CheckList>([]);

  // TODO: these queries need more abstraction
  const { data: allIdentities, isLoading: isLoadingIdentities } =
    useIdentityListQuery();

  const profileQueries = useProfilesQuery(allIdentities ?? []);

  const isLoadingProfiles = profileQueries.some((result) => result.isLoading);

  const onPressClose = () => {
    navigation.popToTop();
  };

  const onPressSubmit = async () => {
    if (decryptedConnectionRequest) {
      const selectedDids = checkList
        .filter((box) => box.checked)
        .map((did) => did.did);

      await ConnectSuite.submitConnection(
        decryptedConnectionRequest,
        selectedDids
      );

      navigation.navigate("ConnectPinConfirmScreen");
    }
  };

  /**
   * Use the route params passed into the screen by the QR code (and/or deeplink)
   * in order to decrypt the connection request. The connection request will be used
   * to generate grants for each selected DID.
   */
  useMount(() => {
    const { nonce, temporaryDid, url } = route.params;
    const decryptedConnectionRequest = ConnectSuite.initConnect(
      temporaryDid,
      nonce,
      url
    );

    setDecryptedConnectionRequest(decryptedConnectionRequest);
  });

  if (isLoadingIdentities || isLoadingProfiles) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.container}>
          <Text style={Typography.heading3}>
            Choose the profiles you’d like to connect to Dwitter
          </Text>
          <View style={styles.body}>
            <View style={styles.column}>
              <Text style={Typography.paragraph2}>
                Youll be able to use the profiles you select below in Dwitter.
              </Text>
              <ProfileSelectChecklist
                checkList={checkList}
                setCheckList={setCheckList}
              />
            </View>
            <View style={styles.column}>
              <Text style={Typography.heading3}>Permissions requested</Text>
              <Text style={Typography.paragraph2}>
                Make sure you trust Dwitter. For each of the profiles you
                selected, Dwitter will be able to:
              </Text>
              <View>
                <Text style={Typography.heading6}>
                  • View and edit your profile
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Button
              style={styles.btn}
              kind="secondary"
              onPress={onPressClose}
              text="Cancel"
            />
            <Button
              style={styles.btn}
              kind="primary"
              onPress={onPressSubmit}
              text="Next"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  scrollview: { flexGrow: 1 },
  container: {
    padding: SPACE.MEDIUM,
    flex: 1,
    gap: SPACE.BASE,
  },
  body: { flex: 1, gap: SPACE.XXXLARGE },
  column: { gap: SPACE.LARGE },
  footer: {
    alignItems: "flex-end",
    marginTop: "auto",
    flexDirection: "row",
    flex: 1,
    gap: SPACE.SMALL,
  },
  btn: { flex: 1 },
});
