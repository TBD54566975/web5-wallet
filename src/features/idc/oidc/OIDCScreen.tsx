import React, { useCallback, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import type { AppNavigatorProps } from "../../../types/navigation";
import { useIdentityListQuery } from "../../identity/hooks";
import { createIdToken, postAuthResponse } from "./idv";

type Props = AppNavigatorProps<"OIDCScreen">;

export const OIDCScreen = ({ route, navigation: _navigation }: Props) => {
  const identities = useIdentityListQuery();
  const oidcParams = route.params;

  const sendRequest = useCallback(async () => {
    if (!identities.data) {
      console.log("No identities data");
      return;
    }

    // identity selection?
    const jwt = await createIdToken(
      identities.data,
      oidcParams.nonce,
      oidcParams.client_id
    );

    const idvUrl = await postAuthResponse(oidcParams.response_uri, jwt);

    if (!idvUrl) {
      console.log("No idvUrl");
      return;
    }

    await InAppBrowser.openAuth(idvUrl, "web5://tabs");
  }, [
    identities.data,
    oidcParams.client_id,
    oidcParams.nonce,
    oidcParams.response_uri,
  ]);

  useEffect(() => void sendRequest(), [sendRequest]);

  if (identities.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.wrapper}>
      <Text>SIOP goes here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});
