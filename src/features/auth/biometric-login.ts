import { isEnrolledAsync, authenticateAsync } from "expo-local-authentication";
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
  WHEN_UNLOCKED_THIS_DEVICE_ONLY,
} from "expo-secure-store";
import { IdentityAgentManager } from "../identity/IdentityAgentManager";

const keychainItemKey = "userPassphrase";
const keychainService = "website.tbd.wallet.web5.biometriclogin";

const isSupported = async (): Promise<boolean> => {
  return await isEnrolledAsync();
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
  return await getItemAsync(keychainItemKey, { keychainService });
};

const setStoredPassphrase = async (passphrase: string) => {
  try {
    await authenticateAsync();
    await setItemAsync(keychainItemKey, passphrase, {
      keychainAccessible: WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      requireAuthentication: true,
      keychainService,
    });
  } catch (e) {
    console.info("Error saving biometric passphrase:", e);
    await clearStoredPassphrase();
  }
};

const clearStoredPassphrase = async () => {
  await deleteItemAsync(keychainItemKey, {
    keychainService,
  });
};

export const BiometricLogin = {
  isSupported,
  login,
  setStoredPassphrase,
  clearStoredPassphrase,
};
