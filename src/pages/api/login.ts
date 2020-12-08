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
  const { email } = req.body.values;
  if (!email) {
    res.send("Server Error");
  } else {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        res.send("error");
      } else {
        const token = sign(user.id.toString(), ACCESS_TOKEN_SECRET, {
          expiresIn: "7d",
        });
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
        res.status(200).json({ token });
      }
    } catch (e) {
      console.log(e);
    }
  }
  next();
});
