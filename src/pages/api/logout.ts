import handler from "../../apiHandlers/handler";
import { AUTH_TOKEN_NAME } from "../../utils/constants";
import { serialize } from "cookie";

export default handler.get(async (_req, res) => {
  res.setHeader(
    "Set-Cookie",
    serialize(AUTH_TOKEN_NAME, "", {
      maxAge: -1,
      path: "/",
    })
  );
  return res.status(200).end();
});
