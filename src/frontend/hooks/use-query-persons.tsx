import { useQuery } from "@tanstack/react-query";
import { backend } from "../../backend/declarations/index";

export default function useQueryPersons() {
  return useQuery({
    queryKey: ["query_persons"],
    queryFn: () => {
      return backend.person_query({ limit: 10, offset: 0 })
    }
  }

  )
}
