import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      pic_id,
      token,
    }: {
      title: string;
      description: string;
      pic_id: number;
      token: string;
    }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}todo`,
        { title, description, pic_id },
        { headers: { Authorization: token } }
      );
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo"],
      });
    },
  });
};
