import { canisterId } from "../../backend/declarations";
import { _SERVICE, idlFactory } from "../../backend/declarations/backend.did.js";
import { createActorHook } from "ic-use-actor";

export const useBackend = createActorHook<_SERVICE>({
  canisterId,
  idlFactory,
});


