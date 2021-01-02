import { applySession } from "next-iron-session";
import handler from "../../apiHandlers/handler";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

export default handler.get(async (req, res) => {
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
  await (req as any).session.destroy();
  return res.status(200).end();
});
