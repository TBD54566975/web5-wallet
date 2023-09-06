import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import type { Profile } from "../../types/models";
import {
  CreateProfileOptions,
  ProfileManager as Web5ProfileManager,
} from "@tbd54566975/web5-user-agent";
import { DidState } from "@tbd54566975/dids";
import { Web5 } from "@tbd54566975/web5";

export const userProfiles = observable<Profile[]>([]);

persistObservable(userProfiles, {
  local: "profiles",
  persistLocal: ObservablePersistMMKV,
});

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

      userProfiles.push(profile);
      return profile;
    } catch (e) {
      throw new Error(
        `Invalid DID Method: '${options.didMethod}' is either not a supported DID Method or not a valid one.`
      );
    }
  },
  getProfile(id: string) {
    return Promise.resolve(
      userProfiles.find((profile) => profile.id.peek() === id)?.get()
    );
  },
  listProfiles() {
    return Promise.resolve(userProfiles.get());
  },
};
