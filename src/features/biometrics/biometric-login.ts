// eslint-disable-next-line import/namespace, import/no-namespace, import/no-deprecated
import * as Keychain from "react-native-keychain";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";

// TODO: Service?

const isSupported = async (): Promise<boolean> => {
  const supportedType = await Keychain.getSupportedBiometryType();
  return !!supportedType;
};

const getStoredPassphrase = async (): Promise<string | null> => {
  const result = await Keychain.getGenericPassword();
  if (result) {
    return result.password;
  } else {
    return null;
  }
};

const login = async (): Promise<boolean> => {
  if (!(await isSupported())) {
    return false;
  }

  const storedPassphrase = await getStoredPassphrase();
  if (storedPassphrase) {
    try {
      await IdentityAgentManager.startAgent(storedPassphrase);
    } catch (e) {
      console.log(
        "Stored passphrase didn't unlock the IdentityAgent. Purging stored passphrase."
      );
      await clearStoredPassphrase();
      return false;
    }
  }

  return true;
};

const setStoredPassphrase = async (passphrase: string) => {
  // The passphrase shouldn't be stored in the keychain if the user doesn't grant
  // access to the system's biometric capabilities.
  //
  // `getGenericPassword` is the only function that will prompt the user to enable
  // biometrics: https://github.com/oblador/react-native-keychain/issues/392
  //
  // Call it after storing the passphrase, discarding any result, so that the prompt appears.
  // In the event that the user DOES deny the use of system biometrics,
  // the operation will throw, indicating any stored passphrase should be cleared.
  try {
    await Keychain.setGenericPassword("agentPassphrase", passphrase, {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
      storage: Keychain.STORAGE_TYPE.RSA,
    });

    await Keychain.getGenericPassword();
  } catch (e) {
    console.log("Error saving biometric passphrase:", e);
    await clearStoredPassphrase();
  }
};

const clearStoredPassphrase = async () => {
  await Keychain.resetGenericPassword();
};

export const BiometricLogin = {
  isSupported,
  login,
  setStoredPassphrase,
  clearStoredPassphrase,
};
