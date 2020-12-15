import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import handler from "../../apiHandlers/handler";
import cookie from "cookie";
import {
  ACCESS_TOKEN_SECRET,
  AUTH_TOKEN_NAME,
  isProduction,
} from "../../utils/constants";
import DBClient from "../../lib/prisma";

const prisma = DBClient.getInstance().prisma;

export default handler.post(async (req, res) => {
  const { name, email, role, password, dateOfBirth, gender } = req.body.values;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      name,
      email,
      role,
      gender,
      password: hashedPassword,
      dateOfBirth,
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
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    email: user.email,
  });
});
