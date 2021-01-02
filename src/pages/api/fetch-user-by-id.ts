import handler from "../../apiHandlers/handler";
import { getUserByIndex } from "../../lib/fauna";
import { UserAuthValues } from "../../utils/randomTypes";

export default handler.post(async (req, res) => {
  // if (req.token) {
  const { userId } = req.body;
  const { email, name, role }: UserAuthValues = await getUserByIndex(
    userId,
    "search_by_id"
  );

  return res.status(200).json({
    userId,
    name,
    email,
    role,
  });
  // }
  return res.status(422).json({ ERROR: "Error" });
});
