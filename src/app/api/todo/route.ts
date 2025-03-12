import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/verifyToken";
import ApiError from "@/types/error.types";
import prisma from "@/lib/prisma";
import logger from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const userToken = verifyToken(req);
    if (userToken.role != "Lead")
      throw { message: "unaothorized", status: 401 };
    const { title, description, pic_id } = await req.json();
    const todo = await prisma.toDo.create({
      data: {
        title,
        description,
        pic_id,
        createdby_id: userToken.id,
        status: "not_started",
        Log: { create: { updateby_id: userToken.id, action: "create" } },
      },
    });
    logger.info(`create todo success`);
    return NextResponse.json({
      message: "to do list created",
      status: 200,
      data: todo,
    });
  } catch (error) {
    const err = error as ApiError;
    logger.error({ message: err.message, status: err.status });
    return NextResponse.json(
      { message: err.message, status: err.status },
      { status: err.status }
    );
  }
}

export async function GET(req: NextRequest) {
  const userToken = verifyToken(req);
  if (!userToken) throw { message: "unaothorized", status: 401 };

  const id = req.nextUrl.searchParams.get("pic_id");
  const findTodo = await prisma.toDo.findMany({
    where: id ? { pic_id: Number(id) } : {},
  });
  return NextResponse.json(findTodo);
}

export async function PATCH(req: NextRequest) {
  try {
    const userToken = verifyToken(req);

    if (!userToken) throw { message: "unaothorized", status: 401 };
    const { desc, todo_id, status_to } = await req.json();
    const findTodo = await prisma.toDo.findFirst({ where: { todo_id } });
    if (!findTodo) throw { message: "todo not exist", status: 400 };

    const update = await prisma.toDo.update({
      where: { todo_id },
      data: {
        description: desc ? desc : findTodo.description,
        status: status_to ? status_to : findTodo.status,
        Log: {
          create: {
            updateby_id: userToken.id,
            action: "update",
            updatedesc: desc ? desc : null,
            status_from: status_to ? findTodo.status : null,
            status_to: status_to ? status_to : null,
          },
        },
      },
    });
    logger.info(`update todo success (id:${update.todo_id})`);
    return NextResponse.json({ message: "update success", data: update });
  } catch (error) {
    const err = error as ApiError;
    logger.error({ message: err.message, status: err.status });
    return NextResponse.json(
      { message: err.message, status: err.status },
      { status: err.status }
    );
  }
}
