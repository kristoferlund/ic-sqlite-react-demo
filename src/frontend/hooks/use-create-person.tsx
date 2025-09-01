import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PersonCreateDto } from "../../backend/declarations/backend.did";
import { useBackend } from "./use-backend";

export default function useCreatePerson() {
  const queryClient = useQueryClient();
  const { actor: backend } = useBackend();

  return useMutation({
    mutationFn: (person: PersonCreateDto) => {
      if (!backend) throw new Error("Backend not available.");
      return backend.person_create(person);
    },
    onSuccess: () => {
      // Invalidate and refetch persons list after successful creation
      void queryClient.invalidateQueries({ queryKey: ["query_persons"] });
    },
  });
}
