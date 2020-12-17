import handler from "../../apiHandlers/handler";
import DBClient from "../../lib/prisma";

const prisma = DBClient.getInstance().prisma;

export default handler.post(async (req, res) => {
  const { id, email } = req.body;
  if (!id || !email) {
    return res.status(404).json({ msg: "Something is Wrong" });
  }
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  if (user?.email === email) {
    return res.status(200).json({ msg: "Unique Email" });
  }
  const uniqueUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (uniqueUser) {
    return res.status(200).json({ msg: "Email Taken" });
  }
  return res.status(200).json({ msg: "Unique Email" });
});
