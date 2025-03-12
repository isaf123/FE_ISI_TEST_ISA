import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/verifyToken";
import ApiError from "@/types/error.types";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const userToken = verifyToken(req);
    if (userToken.role != "Lead")
      throw { message: "unaothorized", status: 401 };
    const { title, description, pic_id } = await req.json();
    const createTodo = await prisma.toDo.create({
      data: {
        title,
        description,
        pic_id,
        createdby_id: userToken.id,
        status: "not_started",
      },
    });
    return NextResponse.json({
      message: "to do list created",
      status: 200,
      data: createTodo,
    });
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      { message: err.message, status: err.status },
      { status: err.status }
    );
  }
}
export async function GET(req: NextRequest) {
  const userToken = verifyToken(req);
  const id = req.nextUrl.searchParams.get("pic_id");
  if (!userToken) throw { message: "unaothorized", status: 401 };
  const findTodo = await prisma.toDo.findMany({
    where: id ? { pic_id: Number(id) } : {},
  });
  return NextResponse.json(findTodo);
}

export async function UPDATE() {}
