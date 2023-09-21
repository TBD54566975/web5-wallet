import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import type { MockProfile } from "@/types/models";

export const profilesAtom = observable<MockProfile[]>([]);

persistObservable(profilesAtom, {
  local: "profiles",
  persistLocal: ObservablePersistMMKV,
});
