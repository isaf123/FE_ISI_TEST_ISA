"use client";

import { Input } from "@/componenst/Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import DropdownButton from "@/componenst/Dropdown";
import { useCreateTodo } from "@/queries/todo";
import Cookies from "js-cookie";

import * as z from "zod";

const registerSchema = z.object({
  title: z.string().min(3, "must fill 3 character for title"),
  description: z.string().min(6, "must fill 6 character for description"),
  pic_id: z.number().min(1),
});

export default function CreateTodo() {
  const createTodo = useCreateTodo();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      title: "",
      description: "",
      pic_id: 0,
    },
  });

  const onSubmit = async (data: {
    title: string;
    description: string;
    pic_id: number;
  }) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw "error";
      await createTodo.mutateAsync({
        description: data.description,
        title: data.title,
        pic_id: data.pic_id,
        token,
      });
      router.push("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mt-24 my-auto font-[family-name:var(--font-geist-sans)]"
    >
      <div className="m-auto w-[340px] flex flex-col gap-5">
        <h3 className="text-3xl font-bold">Create</h3>

        <div>
          <p className="font-semibold text-sm">title</p>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input className="w-full" placeholder="" {...field} />
            )}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <p className="font-semibold text-sm">description</p>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                placeholder="fill the description"
                className="min-w-[300px] w-full rounded-md border border-input
                      border-gray-400 bg-background px-3 py-2 text-sm shadow-sm min-h-[180px]
                      transition-all placeholder:text-muted-foreground 
                      focus:outline-none focus:ring-1 "
                {...field}
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <p className="font-semibold text-sm">user</p>
          <Controller
            name="pic_id"
            control={control}
            render={({ field }) => <DropdownButton data={[]} {...field} />}
          />
          {errors.pic_id && (
            <p className="text-red-500 text-sm">{errors.pic_id.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-md cursor-pointer px-3 py-2 bg-gray-800 text-gray-50"
        >
          Login
        </button>
      </div>
    </form>
  );
}
