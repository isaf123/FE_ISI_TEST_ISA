import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTodo = (token: string) => {
  const response = useQuery({
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/todo`, {
        headers: { Authorization: token },
      });
      return response;
    },
    queryKey: ["todo", token],
  });
  return response.data;
};
