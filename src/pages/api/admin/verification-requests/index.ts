import { applySession } from "next-iron-session";
import handler from "../../../../apiHandlers/handler";
import { getValuesWithIndex } from "../../../../lib/fauna";
import { NEXT_IRON_SESSION_CONFIG } from "../../../../utils/constants";

export default handler.get(async (req, res) => {
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
  const user = (req as any).session.get("user");
  if (user.role === "admin") {
    try {
      const requests: any = await getValuesWithIndex(
        "search_by_verified",
        "pending"
      );
      // console.log("requests", requests);
      return res.status(200).json(requests);
    } catch (e) {
      console.log(e);
      return res.status(422).send("Failed");
    }
  }
  return res.status(403).end("Lol, You are not admin 😇 😈 😏 ");
});
