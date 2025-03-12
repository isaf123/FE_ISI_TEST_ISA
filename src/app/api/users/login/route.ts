import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import ApiError from "@/types/error.types";
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { verifyToken } from "@/lib/verifyToken";
import logger from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const checkUser = await prisma.users.findFirst({
      where: { username },
    });

    if (!checkUser) throw { message: "username not exist", status: 400 };
    const checkPassword = compareSync(password, checkUser.password);
    if (!checkPassword) throw { message: "incorrect password", status: 401 };

    const token = sign(
      {
        id: checkUser.user_id,
        role: checkUser.role,
        username: checkUser.username,
        fullname: checkUser.fullname,
      },
      process.env.TOKEN_KEY || "secret"
    );
    logger.info(`login success (user_id:${checkUser.user_id})`);
    return NextResponse.json({ message: "login success", token });
  } catch (error) {
    const err = error as ApiError;
    logger.error({ message: err.message, status: err.status });
    return NextResponse.json({ message: err.message }, { status: err.status });
  }
}

export async function GET(req: Request) {
  try {
    const userToken = verifyToken(req);
    const user = await prisma.users.findFirst({
      where: { user_id: userToken.id },
    });
    logger.info(`get user`);

    return NextResponse.json({ message: "get profile", data: user });
  } catch (error) {
    const err = error as ApiError;
    logger.error({ message: err.message, status: err.status });

    return NextResponse.json({ message: err.message }, { status: err.status });
  }
}
