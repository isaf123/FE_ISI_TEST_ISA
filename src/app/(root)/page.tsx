"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useUser } from "@/queries/users";
import Card from "@/componenst/Card";
import CardList from "@/componenst/CardList";
import { useTodo } from "@/queries/todo";
import { useRouter } from "next/navigation";
export default function Home() {
  const [token, setToken] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const cookie = Cookies.get("token");
    setToken(cookie);
  }, []);

  const user = useUser(token);
  const todo = useTodo(token);

  return (
    <div className="w-[540px] m-auto mt-10 font-[family-name:var(--font-geist-sans)]">
      <Card>
        <button
          onClick={() => router.push("/create")}
          className="rounded-md cursor-pointer px-3 py-2 bg-gray-300  w-full mb-4 text-4xl text-gray-700 font-semibold"
        >
          +
        </button>
        {todo?.data &&
          todo.data.map(
            (
              val: {
                todo_id: number;
                title: string;
                status: string;
                description: string;
                Pic: { username: string };
              },
              idx: number
            ) => {
              return (
                <CardList
                  key={idx}
                  description={val.description}
                  pic={val.Pic.username}
                  title={val.title}
                  status={val.status}
                />
              );
            }
          )}
      </Card>
    </div>
  );
}
