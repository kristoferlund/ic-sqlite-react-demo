import { idlFactory, type _SERVICE } from "../declarations/backend.did";
import { createActorHook } from "ic-use-actor";

const canisterId = process.env.CANISTER_ID_BACKEND || "";

export const useBackend = createActorHook<_SERVICE>({
  canisterId,
  idlFactory,
});


