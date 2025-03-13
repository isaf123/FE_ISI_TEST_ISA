import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (token: string) => {
  const response = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/users/login`,
        { headers: { Authorization: token } }
      );
      return response;
    },
    queryKey: ["user", token],
  });
  return response.data;
};

export const useUserList = () => {
  const response = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/users/get-list`
      );
      return response;
    },
    queryKey: ["user"],
  });
  return response.data;
};
