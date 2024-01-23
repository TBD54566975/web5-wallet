import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView, type WebViewMessageEvent } from "react-native-webview";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  Jwt,
  PresentationExchange,
  type PresentationDefinitionV2,
} from "@web5/credentials";
import { DidKeyMethod } from "@web5/dids";
import type { AppNavigatorProps } from "../../types/navigation";
import {
  type CheckList,
  ProfileSelectChecklist,
} from "../profile/components/ProfileSelectChecklist";
import { Typography } from "../../theme/typography";
import { Button } from "../../components/Button";
import { SPACE } from "../../theme/layouts";
import { Item } from "../../components/Item";
import { BottomSheet } from "../../components/BottomSheet";
import { credentialStore } from "./atom";
import { Checkable } from "../../components/Tappable";

type Props = AppNavigatorProps<"NOIDCScreen">;
const webviewRef = React.createRef<WebView>();
export const NOIDCScreen = ({ route, navigation }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [credentialReceived, setCredentialReceived] = useState<null | string>(
    null
  );
  const [sheetRoute, setSheetRoute] = useState("CredentialSelectSheet");
  const [presentationDefinition, setPresentationDefinition] = useState<any>();
  const [selectedProfiles, setSelectedProfiles] = useState<CheckList>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const url = route.params.url;

  type IncomingMessage = {
    type: "PRESENTATION_DEFINITION_RESPONSE" | "DID_REQUEST" | "VC_RESPONSE";
    payload: string;
  };
  const onIncomingMessage = (event: WebViewMessageEvent) => {
    const message: IncomingMessage = JSON.parse(event.nativeEvent.data);

    switch (message.type) {
      case "PRESENTATION_DEFINITION_RESPONSE":
        setPresentationDefinition(message.payload);
        setSheetRoute("CredentialSelectSheet");
        bottomSheetRef.current?.present();
        break;
      // user must select a profile
      case "DID_REQUEST":
        setSheetRoute("ProfileSelectSheet");
        bottomSheetRef.current?.present();
        break;
      // noidc success
      // TODO: this is out of order
      case "VC_RESPONSE":
        const data = message.payload;
        setCredentialReceived(data);
        setSheetRoute("ProfileConfirmSheet");
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
  const onCredentialSelect = (presentationDefinition: any, credential: any) => {
    const presentationSubmission =
      PresentationExchange.createPresentationFromCredentials({
        presentationDefinition: presentationDefinition,
        vcJwts: credential,
      });
    const stringifiedPS = JSON.stringify(presentationSubmission);

    webviewRef.current?.injectJavaScript(
      `document.dispatchEvent(new CustomEvent('PresentationSubmission', { detail: ${stringifiedPS} }));`
    );
    bottomSheetRef.current?.dismiss();
  };

  // ProfileSelectSheet
  const onCancel = () => bottomSheetRef.current?.dismiss();
  const onProfileSelect = (checkedItems: CheckList) => {
    setSelectedProfiles(checkedItems);
  };

  // ProfileConfirmSheet
  const onProfileConfirm = () => {
    setSheetRoute("NOIDCSuccessSheet");
  };
  const onProfileUnconfirm = () => setSheetRoute("CredentialSelectSheet");

  // NOIDCSuccessSheet
  const onNOIDCSuccessAccept = () => {
    bottomSheetRef.current?.dismiss();
    navigation.goBack();
  };

  const handleSheetRoute = () => {
    switch (sheetRoute) {
      case "CredentialSelectSheet":
        return (
          <CredentialSelectSheet
            onCancel={onCancel}
            presentationDefinition={presentationDefinition}
            onCredentialSelect={onCredentialSelect}
          />
        );
      case "ProfileSelectSheet":
        return (
          <ProfileSelectSheet
            onCancel={onCancel}
            onProfileSelect={onProfileSelect}
          />
        );
      case "ProfileConfirmSheet":
        return (
          <ProfileConfirmSheet
            onProfileUnconfirm={onProfileUnconfirm}
            onProfileConfirm={onProfileConfirm}
          />
        );
      case "NOIDCSuccessSheet":
        return (
          <NOIDCSuccessSheet onNOIDCSuccessAccept={onNOIDCSuccessAccept} />
        );
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapper}>
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
    </SafeAreaView>
  );
};

type CredentialSelectSheetProps = {
  onCancel: () => void;
  presentationDefinition: PresentationDefinitionV2;
  onCredentialSelect: (presentationDefinition: any, credential: any) => void;
};
const CredentialSelectSheet = ({
  onCancel,
  presentationDefinition,
  onCredentialSelect,
}: CredentialSelectSheetProps) => {
  const matchingCreds = PresentationExchange.selectCredentials({
    vcJwts: [...credentialStore.keys()],
    presentationDefinition,
  });
  const hasMatchingCreds = Boolean(matchingCreds.length);
  const [selectedCredential, setSelectedCredential] = useState<string | null>(
    null
  );

  if (!hasMatchingCreds) {
    <>
      <Text style={Typography.heading1}>Credential required</Text>
      <Text>
        To proceed you are required to provide a credential for
        {presentationDefinition.name}. Please check with the issuer to find out
        how to obtain the required credential.
      </Text>
      <View style={styles.btnRow}>
        <Button
          kind="secondary"
          text="Cancel"
          style={styles.btn}
          onPress={onCancel}
        />
      </View>
    </>;
  }

  return (
    <>
      <Text style={Typography.heading1}>Attach required credential</Text>
      <Text>
        You are being requested to provide a credential for{" "}
        {presentationDefinition.name}{" "}
      </Text>

      <Text>Please select the credential you would like to use:</Text>
      {[...credentialStore].map(([vcJwt, credential], index) => {
        const cred: Record<string, any> = credential.vcDataModel;
        delete cred.credentialSubject.id;

        return (
          <Checkable
            key={index}
            checked={selectedCredential === vcJwt}
            onPress={() => setSelectedCredential(vcJwt)}
            heading={cred.type[1]}
            subtitle={JSON.stringify(Object.values(cred.credentialSubject))}
          />
        );
      })}
      <View style={styles.btnRow}>
        <Button
          kind="secondary"
          text="Cancel"
          style={styles.btn}
          onPress={onCancel}
        />
        <Button
          disabled={selectedCredential === null}
          kind="primary"
          text="Attach"
          style={styles.btn}
          onPress={() => {
            if (selectedCredential !== null) {
              onCredentialSelect(presentationDefinition, selectedCredential);
            }
          }}
        />
      </View>
    </>
  );
};

type ProfileSelectSheetProps = {
  onCancel: () => void;
  onProfileSelect: (checklist: CheckList) => void;
};
const ProfileSelectSheet = ({
  onCancel,
  onProfileSelect,
}: ProfileSelectSheetProps) => {
  const [checkList, setCheckList] = useState<CheckList>([]);
  const checkedItems = checkList.flatMap((listItem) =>
    listItem.checked ? listItem : []
  );
  const hasCheckedItems = Boolean(checkedItems.length);

  const buildDidResponseMessage = async () => {
    // TODO: after Frank updates KMS get the real key and sign
    const didKey = await DidKeyMethod.create();
    const didJwtPromises = checkedItems.map(() =>
      Jwt.sign({
        signerDid: didKey,
        payload: {
          nonce: "1234567",
          iss: didKey.did,
          sub: didKey.did,
        },
      })
    );

    const didJwts = await Promise.all(didJwtPromises);
    const stringifiedDidJwts = JSON.stringify(didJwts);

    if (stringifiedDidJwts) {
      return `document.dispatchEvent(new CustomEvent('DidResponse', { detail: '${stringifiedDidJwts}' }));`;
    }
  };

  const onNextPressed = async () => {
    const didResponse = await buildDidResponseMessage();

    // TODO: make declarative
    if (didResponse) {
      console.log("sending didresponse");
      onProfileSelect(checkedItems);
      webviewRef.current?.injectJavaScript(didResponse);
      console.log("injected JS");
    }
  };

  return (
    <>
      <Text style={Typography.heading1}>Select profiles</Text>
      <ProfileSelectChecklist
        setCheckList={setCheckList}
        checkList={checkList}
      />
      <View style={styles.btnRow}>
        <Button
          kind="secondary"
          text="Cancel"
          style={styles.btn}
          onPress={onCancel}
        />
        <Button
          disabled={!hasCheckedItems}
          kind={"primary"}
          text="Next"
          style={styles.btn}
          onPress={onNextPressed}
        />
      </View>
    </>
  );
};

type ProfileConfirmSheetProps = {
  onProfileUnconfirm: () => void;
  onProfileConfirm: () => void;
};
const ProfileConfirmSheet = ({
  onProfileConfirm,
  onProfileUnconfirm,
}: ProfileConfirmSheetProps) => {
  return (
    <>
      <Text style={Typography.heading1}>Confirm Application</Text>
      <Text>
        Your credential application is ready to submit. If approved, credentials
        will be issued to the following profiles:
      </Text>
      <Item heading="My social profile" body="Sanjay" iconName="person" />
      <View style={styles.btnRow}>
        <Button
          kind="secondary"
          text="Back"
          style={styles.btn}
          onPress={onProfileUnconfirm}
        />
        <Button
          kind={"primary"}
          text="Next"
          style={styles.btn}
          onPress={onProfileConfirm}
        />
      </View>
    </>
  );
};

type NOIDCSuccessSheet = { onNOIDCSuccessAccept: () => void };
const NOIDCSuccessSheet = ({ onNOIDCSuccessAccept }: NOIDCSuccessSheet) => {
  return (
    <>
      <Text style={Typography.heading1}>Application Submitted</Text>
      <Text>Your credential application is submitted.</Text>
      <Button
        kind={"primary"}
        text="Close"
        style={styles.btn}
        onPress={onNOIDCSuccessAccept}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  btnRow: {
    flexDirection: "row",
    gap: SPACE.SMALL,
  },
  btn: { flex: 1 },
});
