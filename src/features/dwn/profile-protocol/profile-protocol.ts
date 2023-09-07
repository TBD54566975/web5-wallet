import { SafeOmit } from "@/types/utils";
import type {
  ProtocolRuleSet,
  ProtocolDefinition,
  ProtocolTypes,
} from "@tbd54566975/dwn-sdk-js";

// TODO: Not sure how to make this work yet. The upstream types don't have generics to accomodate type checking.
export type ProfileProtocolType = {
  displayName: string;
};

// TODO: Type definition of Protocols probably need to get fixed and the child types need to get exported:
export type ProtocolDefinitionRefined = SafeOmit<
  ProtocolDefinition,
  "types" | "structure"
> & {
  types?: ProtocolTypes;
  structure?: Record<string, ProtocolRuleSet>;
};

export const profileProtocol: ProtocolDefinitionRefined = {
  // TODO: Needs to be fixed depending on what we do with Protocols: https://github.com/TBD54566975/web5-wallet/issues/66
  protocol: "http://garfield.com/profile.schema.json",
  types: undefined,
  structure: undefined,
  published: true,
};
