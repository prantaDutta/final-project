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
  console.log("body: ", req.body);
  const { email, password } = req.body.values;
  if (!email || !password) {
    return res.status(406).json({
      error: "Something Went Wrong",
    });
  }
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(404).json({
      email: "Email Doesn't Exist",
    });
  }
  if (await bcrypt.compare(password, user.password)) {
    // Password Match
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
      role: user.role,
    });
  }
  // Password didn't match
  return res.status(401).json({
    password: "Incorrect Credentials",
  });
});
