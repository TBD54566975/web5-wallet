import type {
  CreateProfileOptions,
  ProfileManager as Web5ProfileManager,
} from "@tbd54566975/web5-user-agent";
import Octicons from "@expo/vector-icons/Octicons";
import { Web5 } from "@tbd54566975/web5";
import { profilesAtom } from "@/features/identity/atoms";

export const ProfileManager: Web5ProfileManager = {
  async createProfile(
    options: CreateProfileOptions & {
      displayName?: string;
    } & { icon: keyof typeof Octicons.glyphMap }
  ) {
    if (!options.did && !options.didMethod) {
      throw new Error("Must provide DID or DID Method");
    }

    try {
      const did = options.did ?? (await Web5.did.create(options.didMethod!));

      const profile = {
        did,
        id: did.id,
        name: options.name ?? "",
        displayName: options.displayName ?? "",
        icon: options.icon ?? "",
        connections: [],
        dateCreated: new Date(),
        credentials: [],
      };

      profilesAtom.push(profile);
      return profile;
    } catch (e) {
      throw new Error(
        `Invalid DID Method: '${options.didMethod}' is either not a supported DID Method or not a valid one.`
      );
    }
  },
  getProfile(id: string) {
    return Promise.resolve(
      profilesAtom.find((profile) => profile.id.peek() === id)?.get()
    );
  },
  listProfiles() {
    return Promise.resolve(profilesAtom.get());
  },
};
