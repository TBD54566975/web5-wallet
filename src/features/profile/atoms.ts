import { observable } from "@legendapp/state";
import type { Profile } from "../../types/models";

type ProfilesAtom = { profiles: Profile[] };

export const profilesAtom = observable<ProfilesAtom>({ profiles: [] });
