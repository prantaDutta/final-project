import handler from "../../apiHandlers/handler";
import { prisma } from "../../lib/prisma";

export default handler.post(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(422).end();
  }
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(200).json({ msg: "Unique Email" });
  }
  return res.status(200).json({
    msg: "Email already been taken",
  });
});
