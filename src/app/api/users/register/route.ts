import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import hashPassword from "@/lib/hashPashword";
import ApiError from "@/types/error.types";
import logger from "@/lib/logger";

export async function POST(req: Request) {
  const { username, fullname, password, role } = await req.json();
  try {
    const checkUsername = await prisma.users.findFirst({
      where: { username },
    });
    if (checkUsername) throw { message: "username already exist", status: 400 };

    const hashPass = await hashPassword(password);
    const newUser = await prisma.users.create({
      data: { fullname, username, password: hashPass, role },
    });
    logger.info(`resgister success (user_id:${newUser})`);
    return NextResponse.json({ message: "create user success", data: newUser });
  } catch (error) {
    const err = error as ApiError;
    logger.error({ message: err.message, status: err.status });
    return NextResponse.json({ message: err.message }, { status: err.status });
  }
}
