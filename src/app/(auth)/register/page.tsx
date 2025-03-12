"use client";

import { Input } from "@/componenst/Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";

import * as z from "zod"; // Pastikan Zod sudah diinstal

// Skema validasi dengan Zod
const registerSchema = z
  .object({
    username: z.string().min(3, "must fill 3 character for username"),
    fullname: z.string().min(3, "must fill 3 character for username"),
    password: z.string().min(6, "must fill 6 character for username"),
    repassword: z.string().min(6, "must fill 6 character for username"),
    role: z.enum(["Lead", "Team"], { message: "please select role" }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "pasword not match",
    path: ["repassword"],
  });

export default function Register() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema), // Gunakan Zod untuk validasi
    defaultValues: {
      username: "",
      fullname: "",
      password: "",
      repassword: "",
    },
  });

  // Fungsi yang dipanggil saat form dikirimkan
  const onSubmit = async (data: {
    username: string;
    password: string;
    fullname: string;
    role: string;
  }) => {
    try {
      const register = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/users/register`,
        {
          username: data.username,
          fullname: data.fullname,
          password: data.password,
          role: data.role,
        }
      );
      console.log(register.data);
      router.push("/login");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mt-48 my-auto font-[family-name:var(--font-geist-sans)]"
    >
      <div className="m-auto w-[340px] flex flex-col gap-5">
        <h3 className="text-3xl font-bold">Register</h3>

        <div>
          <p className="font-semibold text-sm">username</p>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input className="w-full" placeholder="andi123" {...field} />
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div>
          <p className="font-semibold text-sm">fullname</p>
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <Input className="w-full" placeholder="andi" {...field} />
            )}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm">{errors.fullname.message}</p>
          )}
        </div>

        <div>
          <p className="font-semibold text-sm">password</p>
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
        <div>
          <p className="font-semibold text-sm">re-enter password</p>

          <Controller
            name="repassword"
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
          {errors.repassword && (
            <p className="text-red-500 text-sm">{errors.repassword.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Lead"
                    checked={field.value === "Lead"}
                    onChange={() => field.onChange("Lead")}
                  />
                  Lead
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Team"
                    checked={field.value === "Team"}
                    onChange={() => field.onChange("Team")}
                  />
                  Team
                </label>
              </div>
            )}
          />

          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
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
