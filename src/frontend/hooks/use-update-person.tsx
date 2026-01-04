import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PersonUpdateDto } from "../declarations/backend.did";
import { useBackend } from "./use-backend";

export default function useUpdatePerson() {
  const queryClient = useQueryClient();
  const { actor: backend } = useBackend();

  return useMutation({
    mutationFn: (params: PersonUpdateDto) => {
      if (!backend) throw new Error("Backend not available.");
      return backend.person_update(params);
    },
    onSuccess: () => {
      // Invalidate and refetch persons list after successful update
      void queryClient.invalidateQueries({ queryKey: ["query_persons"] });
    },

  });
}
