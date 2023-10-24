import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Typography } from "@/theme/typography";
import { SPACE } from "@/theme/layouts";
import { Avatar } from "@/components/Avatar";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import Loader from "@/components/Loader";
import { useIdentityList } from "@/features/identity/hooks";
import { useProfiles } from "@/features/profile/hooks";
import { ConnectSuite } from "@/features/connect/connect-suite";
import { useMount } from "@/hooks/useMount";
import type { AppNavigatorProps } from "@/types/navigation";
import type { ConnectRequest, Profile } from "@/types/models";

type Props = AppNavigatorProps<"ConnectProfileSelectScreen">;
const ConnectProfileSelectScreen = ({ navigation, route }: Props) => {
  const [checkList, setCheckList] = useState<CheckList>([]);
  const [decryptedConnectionRequest, setDecryptedConnectionRequest] =
    useState<ConnectRequest>();

  // TODO: these queries need more abstraction
  const { data: allIdentities, isLoading: isLoadingIdentities } =
    useIdentityList();

  const profileQueries = useProfiles(allIdentities ?? [], {
    enabled: allIdentities !== undefined,
    staleTime: 3600000,
  });

  const isLoadingProfiles = profileQueries.some((result) => result.isLoading);

  // create a derived state `checkList` with a `checked` property on each profile
  // TODO: maybe abstract this out of the view?
  type CheckList = (Profile & { checked: boolean })[];
  const deriveChecklistState = () => {
    if (!isLoadingProfiles) {
      const identitiesWithCheckmarks = profileQueries.flatMap(
        ({ data: profile }) => {
          if (profile) {
            return [{ ...profile, checked: false }];
          } else {
            return [];
          }
        }
      );
      setCheckList(identitiesWithCheckmarks);
    }
  };

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

  // TODO: abstract to React Query
  useEffect(() => {
    if (!isLoadingProfiles && !isLoadingIdentities) {
      deriveChecklistState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingProfiles, isLoadingIdentities]);

  /**
   * Use the route params passed into the screen by the QR code (and/or deeplink)
   * in order to decrypt the connection request. The connection request will be used
   * to generate grants for each selected DID.
   */
  useMount(() => {
    const { connectNonce, temporaryDid, serverURL } = route.params;
    const decryptedConnectionRequest = ConnectSuite.initConnect(
      temporaryDid,
      connectNonce,
      serverURL
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
              <>
                {checkList.map((profile, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setCheckList((current) => {
                          current[index].checked = !current[index].checked;

                          // immutably set the current state
                          return [...current];
                        });
                      }}
                    >
                      <View key={index} style={styles.profilesListItem}>
                        {/* TODO: there is currently no concept of a web5 profile having an icon */}
                        {/* https://github.com/TBD54566975/web5-wallet/issues/145 */}
                        <Avatar iconName={"person"} />
                        <View>
                          <Text style={Typography.heading5}>
                            {profile.displayName}
                          </Text>
                          <Text>{profile.name}</Text>
                        </View>
                        <Checkbox
                          checked={profile.checked}
                          style={styles.checkbox}
                        />
                      </View>
                    </Pressable>
                  );
                })}
              </>
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
  profilesListItem: {
    flexDirection: "row",
    gap: SPACE.BASE,
    alignItems: "center",
  },
  container: {
    padding: SPACE.MEDIUM,
    flex: 1,
    gap: SPACE.BASE,
  },
  body: { flex: 1, gap: SPACE.XXXLARGE },
  checkbox: { marginLeft: "auto" },
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

export default ConnectProfileSelectScreen;
