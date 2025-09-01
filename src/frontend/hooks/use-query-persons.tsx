import { useQuery } from "@tanstack/react-query";
import { useBackend } from "./use-backend";

export default function useQueryPersons() {
  const { actor: backend } = useBackend();
  return useQuery({
    queryKey: ["query_persons"],
    queryFn: () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return backend!.person_query({ limit: 10, offset: 0 })
    },
    enabled: !!backend
  })
}
