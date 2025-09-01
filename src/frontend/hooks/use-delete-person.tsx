import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./use-backend";

export default function useDeletePerson() {
  const queryClient = useQueryClient();
  const { actor: backend } = useBackend();

  return useMutation({
    mutationFn: (id: number) => {
      if (!backend) throw new Error("Backend not available.");
      return backend.person_delete(id);
    },
    onSuccess: () => {
      // Invalidate and refetch persons list after successful deletion
      void queryClient.invalidateQueries({ queryKey: ["query_persons"] });
    },
  });
}
