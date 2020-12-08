import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import prisma from "../../lib/prisma";
import handler from "../../apiHandlers/handler";
import cookie from "cookie";
import {
  ACCESS_TOKEN_SECRET,
  AUTH_TOKEN_NAME,
  isProduction,
} from "../../utils/constants";

export default handler.post(async (req, res, next) => {
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
    res.json({ error: "Something Went Wrong" });
  } else {
    const token = sign(user.id.toString(), ACCESS_TOKEN_SECRET);
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(AUTH_TOKEN_NAME, token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })
    );
    res.status(200).json({ userId: user.id });
  }
  next();
});
