import bcrypt from "bcrypt";
import cookie from "cookie";
import { sign } from "jsonwebtoken";
import handler from "../../apiHandlers/handler";
import { prisma } from "../../lib/prisma";
import {
  ACCESS_TOKEN_SECRET,
  AUTH_TOKEN_NAME,
  isProduction,
} from "../../utils/constants";

export default handler.post(async (req, res) => {
  const { name, email, role, password } = req.body.values;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      name,
      email,
      role,
      password: hashedPassword,
    },
  });

  if (!user) {
    console.log("something is wrong");
    return res.status(422).json({ error: "Something Went Wrong" });
  }
  const token = sign(user.id.toString(), ACCESS_TOKEN_SECRET);
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(AUTH_TOKEN_NAME, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3, // 3 days
      path: "/",
    })
  );
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});
