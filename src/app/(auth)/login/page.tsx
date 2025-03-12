"use client";

import { Input } from "@/componenst/Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import axios from "axios";

import * as z from "zod"; // Pastikan Zod sudah diinstal

// Skema validasi dengan Zod
const loginSchema = z.object({
  username: z.string().min(3, "must fill 3 character for username"),
  password: z.string().min(6, "must fill 6 character for username"),
});

export default function Login() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema), // Gunakan Zod untuk validasi
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Fungsi yang dipanggil saat form dikirimkan
  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      const login = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/users/login`,
        { username: data.username, password: data.password }
      );
      Cookies.set("token", login.data.token);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mt-48 my-auto font-[family-name:var(--font-geist-sans)]"
    >
      <div className="m-auto w-[340px] flex flex-col gap-6">
        <h3 className="text-2xl font-bold">Login</h3>

        <div>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input className="w-full" placeholder="Username" {...field} />
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                className="w-full"
                placeholder="Password"
                type="password"
                {...field}
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
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
