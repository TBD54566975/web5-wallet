import {
  CreateProfileOptions,
  ProfileManager as Web5ProfileManager,
} from "@tbd54566975/web5-user-agent";
import { DidState } from "@tbd54566975/dids";
import { Web5 } from "@tbd54566975/web5";
import { profilesAtom } from "@/features/identity/atoms";
import type { Profile } from "../../types/models";

export const ProfileManager: Web5ProfileManager = {
  async createProfile(
    options: CreateProfileOptions & {
      displayName?: string;
    }
  ) {
    if (!options.did && !options.didMethod) {
      throw new Error("Must provide DID or DID Method");
    }

    try {
      const did: DidState =
        options.did ?? (await Web5.did.create(options.didMethod!));

      const profile: Profile = {
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
