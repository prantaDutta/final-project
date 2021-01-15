import { applySession } from "next-iron-session";
import handler from "../../apiHandlers/handler";
import { prisma } from "../../lib/prisma";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

export default handler.post(async (req, res) => {
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
  const user = (req as any).session.get("user");
  if (user?.role === "admin") {
    const { id } = req.body;
    // const { data }: any = await client.query(
    //   q.Get(q.Match(q.Index("search_by_id"), userId))
    // );
    console.log("id", id);
    const data = await prisma.users.findUnique({
      where: {
        id: +id,
      },
    });

    const { email, name, role } = data!;

    return res.status(200).json({
      id,
      name,
      email,
      role,
    });
  }
  return res.status(422).json({ ERROR: "Error" });
});
