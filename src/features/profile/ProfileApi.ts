import {
  CreateProfileOptions,
  ProfileManager,
} from "@tbd54566975/web5-user-agent";
import { DidState } from "@tbd54566975/dids";
import { Web5 } from "@tbd54566975/web5";
import { Profile } from "../../types/models";
import { profilesAtom } from "./atoms";

export default new (class implements ProfileManager {
  async createProfile(options: CreateProfileOptions): Promise<Profile> {
    if (!options.did && !options.didMethod) {
      throw new Error("must provide did or didMethod");
    }

    var did: DidState;
    if (options.did) {
      did = options.did;
    } else {
      switch (options.didMethod) {
        case "ion":
          did = await Web5.did.create("ion");
          break;
        case "key":
          did = await Web5.did.create("key");
          break;
        default:
          throw new Error("Invalid didMethod");
          break;
      }
    }

    const profile: Profile = {
      id: did.id,
      did: did,
      name: options.name ?? "",
      icon: options.icon ?? "",
      connections: [],
      dateCreated: new Date(),
      credentials: [],
    };

    profilesAtom.push(profile);
    return profile;
  }

  getProfile(id: string): Promise<Profile | undefined> {
    return Promise.resolve(
      profilesAtom.find((profile) => profile.id.peek() === id)?.get()
    );
  }

  listProfiles(): Promise<Profile[]> {
    return Promise.resolve(profilesAtom.get());
  }
})();
