import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from "react-native";
import { Loader } from "../../components/Loader";
import { useMount } from "../../hooks/useMount";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import type { AppNavigatorProps } from "../../types/navigation";
import { useProfilesQuery } from "../profile/hooks";
import { Button } from "../../components/Button";
import {
  type CheckList,
  ProfileSelectChecklist,
} from "../profile/components/ProfileSelectChecklist";
import type { Web5ConnectAuthRequest } from "@web5/agent";
import { IdentityAgentManager } from "../identity/IdentityAgentManager";
import { Oidc } from "@web5/agent";
import { CryptoUtils } from "@web5/crypto";

type Props = AppNavigatorProps<"ConnectProfileSelectScreen">;
export const ConnectProfileSelectScreen = ({ navigation, route }: Props) => {
  const [decryptedConnectionRequest, setDecryptedConnectionRequest] =
    useState<Web5ConnectAuthRequest>();
  const [checkList, setCheckList] = useState<CheckList>([]);

  // passed by the QR code
  const { request_uri, encryption_key } = route.params;

  // TODO: these queries need more abstraction
  const profileQueries = useProfilesQuery();
  const isLoading = profileQueries.some((result) => result.isLoading);

  const onPressClose = () => {
    navigation.replace("Tabs", { screen: "DiscoverScreen" });
  };

  const selectedDid = checkList.find((box) => box.checked);

  const onPressSubmit = async () => {
    if (decryptedConnectionRequest && selectedDid) {
      const agent = IdentityAgentManager.getAgent();

      const pin = CryptoUtils.randomPin({ length: 4 });
      await Oidc.submitAuthResponse(
        selectedDid.did,
        decryptedConnectionRequest,
        pin,
        agent
      );

      navigation.navigate("ConnectPinConfirmScreen", { pin });
    }
  };

  /**
   * Use the route params passed into the screen by the QR code (and/or deeplink)
   * in order to decrypt the connection request. The connection request will be used
   * to generate grants for each selected DID.
   */
  const connect = async () => {
    console.log('Fetching request from Auth Request URI:', request_uri);
    const decryptedConnectionRequest = await Oidc.getAuthRequest(
      request_uri,
      encryption_key
    );
    setDecryptedConnectionRequest(decryptedConnectionRequest);
  };

  useMount(() => void connect());

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.container}>
          <Text style={Typography.heading3}>
            Choose the profile you’d like to connect to Fllw
          </Text>
          <View style={styles.body}>
            <View style={styles.column}>
              <Text style={Typography.paragraph2}>
                Youll be able to use the profile you select below in Fllw.
              </Text>
              <ProfileSelectChecklist
                checkList={checkList}
                setCheckList={setCheckList}
                exclusive={true}
              />
            </View>
            <View style={styles.column}>
              <Text style={Typography.heading3}>Permissions requested</Text>
              <Text style={Typography.paragraph2}>
                Make sure you trust Fllw. Fllw will be able to:
              </Text>
              {
                // TODO: better handling for when decryptedConnectionRequest is `undefined` 
                (decryptedConnectionRequest?.permissionRequests || []).map((request) => (
                  <View key={request.protocolDefinition.protocol}>
                    <Text style={Typography.heading6}>
                      • {request.protocolDefinition.protocol}
                    </Text>
                    <Text style={Typography.heading6}>
                      {request.permissionScopes
                        .map((scope) => {
                          return `${scope.method} ${scope.interface}`;
                        })
                        .join(", ")}
                    </Text>
                  </View>
                ))
              }
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
