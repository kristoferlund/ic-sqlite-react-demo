import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "../../backend/declarations/index";
import { PersonUpdateDto } from "src/backend/declarations/backend.did";

// interface UpdatePersonInput {
//   id: number;
//   name?: string;
//   age?: number;
// }
//
// interface PersonUpdateDto {
//   id: number;
//   name: [] string;
//   age?: number;
// }
//
export default function useUpdatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PersonUpdateDto) => {
      return backend.person_update(params);
    },
    onSuccess: () => {
      // Invalidate and refetch persons list after successful update
      queryClient.invalidateQueries({ queryKey: ["query_persons"] });
    },
  });
}
