import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "../../backend/declarations/index";
import { PersonCreateDto } from "src/backend/declarations/backend.did";

export default function useCreatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (person: PersonCreateDto) => {
      return backend.person_create(person);
    },
    onSuccess: () => {
      // Invalidate and refetch persons list after successful creation
      void queryClient.invalidateQueries({ queryKey: ["query_persons"] });
    },
  });
}
