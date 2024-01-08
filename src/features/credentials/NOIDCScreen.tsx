import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { WebView, type WebViewMessageEvent } from "react-native-webview";
import type { AppNavigatorProps } from "../../types/navigation";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  type BottomSheetBackdropProps,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../../theme/typography";
import { useIdentityListQuery } from "../identity/hooks";
import { Button } from "../../components/Button";
import { Jwt } from "@web5/credentials";
import { DidKeyMethod } from "@web5/dids";
import type { ManagedIdentity } from "@web5/agent";

type Props = AppNavigatorProps<"NOIDCScreen">;
export const NOIDCScreen = ({ route }: Props) => {
  const { data: identities } = useIdentityListQuery();
  const webviewRef = useRef<WebView>(null);
  const didBottomSheetRef = useRef<BottomSheetModal>(null);
  const credentialBottomSheetRef = useRef<BottomSheetModal>(null);
  const [credentialReceived, setCredentialReceived] = useState(null);

  const url = route.params.url;

  type WebviewMessage = { type: "DID_REQUEST" | "VC_RESPONSE"; payload: any };
  const handleWebviewMessage = (event: WebViewMessageEvent) => {
    const message: WebviewMessage = JSON.parse(event.nativeEvent.data);

    switch (message.type) {
      case "DID_REQUEST":
        didBottomSheetRef.current?.present();
        break;
      case "VC_RESPONSE":
        const data = message.payload;
        setCredentialReceived(data);
        didBottomSheetRef.current?.dismiss();
        credentialBottomSheetRef.current?.present();
        break;
    }
  };

  const source = useMemo(
    () => ({
      uri: url,
    }),
    [url]
  );

  const buildDidResponseMessage = async (identity: ManagedIdentity) => {
    // TODO: after Frank updates KMS get the real key and sign
    NOOP(identity);
    const didKey = await DidKeyMethod.create();

    const jwt = await Jwt.sign({
      signerDid: didKey,
      payload: {
        nonce: "1234567",
        iss: didKey.did,
        sub: didKey.did,
      },
    });
    return `document.dispatchEvent(new CustomEvent('DidResponse', { detail: '${jwt}' }));`;
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.wrapper}>
          <WebView
            ref={webviewRef}
            injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
            injectedJavaScriptForMainFrameOnly={false}
            mixedContentMode="always"
            pullToRefreshEnabled={true}
            source={source}
            thirdPartyCookiesEnabled={true}
            applicationNameForUserAgent={"NOIDC"}
            onMessage={handleWebviewMessage}
          />
          <BottomSheetModal
            ref={didBottomSheetRef}
            enablePanDownToClose={true}
            index={0}
            snapPoints={snapPoints}
            handleComponent={BottomSheetKnob}
            backdropComponent={BottomSheetBackdropCustom}
            style={styles.bottomSheet}
          >
            <View style={styles.bottomSheetContainer}>
              <Text style={Typography.heading1}>Select a profile</Text>
              <View style={styles.profileButtonList}>
                {identities?.map((identity) => (
                  <Button
                    key={identity.did}
                    kind={"primary"}
                    text={`${identity.name}`}
                    onPress={async () => {
                      const message = await buildDidResponseMessage(identity);
                      webviewRef.current?.injectJavaScript(message);
                      didBottomSheetRef.current?.close();
                    }}
                  />
                ))}
              </View>
            </View>
          </BottomSheetModal>
          <BottomSheetModal
            ref={credentialBottomSheetRef}
            enablePanDownToClose={true}
            index={0}
            snapPoints={snapPoints}
            handleComponent={BottomSheetKnob}
            backdropComponent={BottomSheetBackdropCustom}
            style={styles.bottomSheet}
          >
            <View style={styles.bottomSheetContainer}>
              <Text style={Typography.heading1}>Credential Received</Text>
              <Text>{JSON.stringify(credentialReceived)}</Text>
            </View>
          </BottomSheetModal>
        </View>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  bottomSheetKnobHeader: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  bottomSheetKnobBody: {
    position: "absolute",
    width: 50,
    height: 4,
    backgroundColor: "#999",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  bottomSheet: {
    paddingBottom: 35,
    paddingHorizontal: 5,
  },
  profileButtonList: { flexWrap: "wrap", flexDirection: "row", gap: 8 },
});

const snapPoints = ["40%"];

const BottomSheetKnob = () => {
  return (
    <View style={styles.bottomSheetKnobHeader}>
      <View style={styles.bottomSheetKnobBody} />
    </View>
  );
};

const BottomSheetBackdropCustom = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    enableTouchThrough={false}
    pressBehavior="none"
  />
);
