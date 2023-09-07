import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import type { Profile } from "../../types/models";

export const profilesAtom = observable<Profile[]>([]);

persistObservable(profilesAtom, {
  local: "profiles",
  persistLocal: ObservablePersistMMKV,
});
