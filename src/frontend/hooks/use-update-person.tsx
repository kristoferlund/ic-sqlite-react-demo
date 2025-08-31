import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "../../backend/declarations/index";
import { PersonUpdateDto } from "src/backend/declarations/backend.did";

export default function useUpdatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PersonUpdateDto) => {
      return backend.person_update(params);
    },
    onSuccess: () => {
      // Invalidate and refetch persons list after successful update
      void queryClient.invalidateQueries({ queryKey: ["query_persons"] });
    },
  });
}
