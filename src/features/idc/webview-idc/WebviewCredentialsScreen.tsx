import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { WebView, type WebViewMessageEvent } from "react-native-webview";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { AppNavigatorProps } from "../../../types/navigation";
import { Typography } from "../../../theme/typography";
import { SPACE } from "../../../theme/layouts";
import { Item } from "../../../components/Item";
import { BottomSheet } from "../../../components/BottomSheet";
import { ColorTheme } from "../../../theme/colors";
import { Octicons } from "@expo/vector-icons";
import { CredentialApplicationSuccessSheet } from "../CredentialApplicationSuccessSheet";
import { ProfilesConfirmSheet } from "../ProfilesConfirmSheet";
import { ProfileSelectSheet } from "../ProfileSelectSheet";
import { webviewRef } from "../webviewRef";
import { CredentialSelectSheet } from "../CredentialSelectSheet";

type Props = AppNavigatorProps<"WebviewCredentialsScreen">;
export const WebviewCredentialsScreen = ({ route, navigation }: Props) => {
  // const [credentialReceived, setCredentialReceived] = useState<null | string>(
  //   null
  // );
  const [sheetRoute, setSheetRoute] = useState("CredentialSelectSheet");
  const [attachmentRequirements, setAttachmentRequirements] = useState<any>();
  const [attachedCreds, setAttachedCreds] = useState<unknown[]>([]);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const url = route.params.url;

  type IncomingMessage = {
    type:
      | "ATTACH_CREDENTIAL"
      | "SELECT_DIDS"
      | "VC_FROM_WEBVIEW"
      | "ATTACH_CREDENTIAL_SUCCESS";
    payload: any;
  };
  const onIncomingMessage = (event: WebViewMessageEvent) => {
    const message: IncomingMessage = JSON.parse(event.nativeEvent.data);
    const data = message.payload;

    switch (message.type) {
      case "ATTACH_CREDENTIAL":
        setAttachmentRequirements(message.payload);
        setSheetRoute("CredentialSelectSheet");
        bottomSheetRef.current?.present();
        break;
      // user must select a profile
      case "SELECT_DIDS":
        console.log("selectDids message received");
        setSheetRoute("ProfileSelectSheet");
        bottomSheetRef.current?.present();
        break;
      case "ATTACH_CREDENTIAL_SUCCESS":
        setAttachedCreds((arr) => [...arr, data]);
        break;
      // success
      case "VC_FROM_WEBVIEW":
        // setCredentialReceived(data);
        setSheetRoute("ProfilesConfirmSheet");
        break;
    }
  };

  const webviewSource = useMemo(
    () => ({
      uri: url,
    }),
    [url]
  );

  // CredentialSelectSheet
  const onCredentialSelect = (
    selectedCredential: any,
    requiredCredential: string
  ) => {
    const payload = JSON.stringify({
      credential: selectedCredential,
      requiredCredential,
    });

    webviewRef.current?.injectJavaScript(
      `document.dispatchEvent(new CustomEvent('AttachCredentialToWebView', { detail: ${payload} }));`
    );
    bottomSheetRef.current?.dismiss();
  };

  // ProfileSelectSheet
  const onCancel = () => bottomSheetRef.current?.dismiss();

  // ProfileConfirmSheet
  const onProfilesConfirm = () => {
    setSheetRoute("CredentialApplicationSuccessSheet");
  };
  const onProfilesUnconfirm = () => setSheetRoute("CredentialSelectSheet");

  // CredentialApplicationSuccessSheet
  const onSuccess = () => {
    bottomSheetRef.current?.dismiss();
    navigation.goBack();
  };

  const handleSheetRoute = () => {
    switch (sheetRoute) {
      case "CredentialSelectSheet":
        return (
          <CredentialSelectSheet
            onCancel={onCancel}
            attachmentRequirements={attachmentRequirements}
            onCredentialSelect={onCredentialSelect}
          />
        );
      case "ProfileSelectSheet":
        return <ProfileSelectSheet onCancel={onCancel} />;
      case "ProfilesConfirmSheet":
        return (
          <ProfilesConfirmSheet
            onProfilesUnconfirm={onProfilesUnconfirm}
            onProfilesConfirm={onProfilesConfirm}
          />
        );
      case "CredentialApplicationSuccessSheet":
        return <CredentialApplicationSuccessSheet onSuccess={onSuccess} />;
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerColumn}>
        <Item
          heading="KYC Credential"
          body="Issued by Duff Bank"
          headingSize="heading7"
          iconName="id-badge"
        />
        {!!attachedCreds.length && (
          <View style={styles.attachmentContainer}>
            <Octicons name={"id-badge"} size={18} />
            <Text style={Typography.heading5}>
              {attachedCreds.length} credentials attached
            </Text>
          </View>
        )}
      </View>
      <WebView
        ref={webviewRef}
        injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
        injectedJavaScriptForMainFrameOnly={false}
        mixedContentMode="always"
        pullToRefreshEnabled={true}
        thirdPartyCookiesEnabled={true}
        source={webviewSource}
        onMessage={onIncomingMessage}
      />
      <BottomSheet ref={bottomSheetRef}>{handleSheetRoute()}</BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  attachmentContainer: {
    flexDirection: "row",
    backgroundColor: ColorTheme.GRAY_50,
    alignSelf: "center",
    padding: SPACE.XSMALL,
    borderRadius: 12,
    gap: SPACE.SMALL,
  },
  headerColumn: {
    paddingHorizontal: SPACE.BASE,
    paddingBottom: SPACE.BASE,
    gap: SPACE.BASE / 2,
  },
});
