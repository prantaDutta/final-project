import handler from "../../apiHandlers/handler";
import DBClient from "../../lib/prisma";
import { ModifiedUserData } from "../../utils/randomTypes";

const prisma = DBClient.getInstance().prisma;

export default handler.post(async (req, res) => {
  if (req.token) {
    const { id } = req.body;
    const intId = parseInt(id);
    const user = await prisma.users.findUnique({
      where: {
        id: intId,
      },
    });
    if (user) {
      const userData: ModifiedUserData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      // console.log(user);
      return res.status(200).json(userData);
    }
  }
  return res.status(422).json({ ERROR: "Error" });
});
