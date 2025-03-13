import prisma from "@/lib/prisma";
import logger from "@/lib/logger";
import { NextResponse } from "next/server";
import ApiError from "@/types/error.types";

export async function GET(req: Request) {
  try {
    const user = await prisma.users.findMany({
      select: { user_id: true, username: true, fullname: true },
    });
    logger.info(`get user list`);

    return NextResponse.json(user);
  } catch (error) {
    const err = error as ApiError;
    logger.error({ message: err.message, status: err.status });

    return NextResponse.json({ message: err.message }, { status: err.status });
  }
}
