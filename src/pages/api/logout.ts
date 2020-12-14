import handler from "../../apiHandlers/handler";
import { AUTH_TOKEN_NAME, isProduction } from "../../utils/constants";
import cookie from "cookie";

export default handler.get(async (_req, res, next) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(AUTH_TOKEN_NAME, "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: -3600, // 7 days
      path: "/",
    })
  );
  res.status(200).json({ nice: "NOISE" });
  next();
});
