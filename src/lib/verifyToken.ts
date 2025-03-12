import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyToken(req: Request) {
  const token = req.headers.get("Authorization");
  if (!token) throw { messageL: "unauthorized", status: 400 };

  const decoded = jwt.verify(
    token,
    process.env.TOKEN_KEY || "secret"
  ) as JwtPayload;
  return decoded;
}
