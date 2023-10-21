/* eslint-disable import/no-namespace */
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";

const keychainItemKey = "userPassphrase";
const keychainService = "website.tbd.wallet.web5.biometriclogin";

const isSupported = async (): Promise<boolean> => {
  return await LocalAuthentication.isEnrolledAsync();
};

const login = async (): Promise<boolean> => {
  if (!(await isSupported())) {
    return false;
  }

  const storedPassphrase = await getStoredPassphrase();
  if (storedPassphrase) {
    try {
      await IdentityAgentManager.startAgent(storedPassphrase);
      return true;
    } catch (e) {
      console.info(
        "Stored passphrase didn't unlock the IdentityAgent. Purging stored passphrase."
      );
      await clearStoredPassphrase();
      return false;
    }
  }

  return false;
};

const getStoredPassphrase = async () => {
  return await SecureStore.getItemAsync(keychainItemKey, { keychainService });
};

const setStoredPassphrase = async (passphrase: string) => {
  try {
    await LocalAuthentication.authenticateAsync();
    await SecureStore.setItemAsync(keychainItemKey, passphrase, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      requireAuthentication: true,
      keychainService,
    });
  } catch (e) {
    console.info("Error saving biometric passphrase:", e);
    await clearStoredPassphrase();
  }
};

const clearStoredPassphrase = async () => {
  await SecureStore.deleteItemAsync(keychainItemKey, {
    keychainService,
  });
};

export const BiometricLogin = {
  isSupported,
  login,
  setStoredPassphrase,
  clearStoredPassphrase,
};
