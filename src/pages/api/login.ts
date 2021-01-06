import { compare } from "bcrypt";
import { applySession } from "next-iron-session";
import handler from "../../apiHandlers/handler";
import { client, q } from "../../lib/fauna";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

// export default handler.post(async (req, res) => {
export default handler.post(async (req, res) => {
  const { email, password } = req.body.values;
  if (!email || !password) {
    return res.status(406).json({
      error: "Something Went Wrong",
    });
  }

  try {
    const { data }: any = await client.query(
      q.Get(q.Match(q.Index("search_by_email"), email))
    );
    if (await compare(password, data.password!)) {
      // password matched
      delete data.password;
      const { userId, name, email, role, verified } = data;
      await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
      (req as any).session.set("user", data);
      await (req as any).session.save();
      return res.status(200).json({
        userId,
        name,
        email,
        role,
        verified,
      });
    }
    // Invalid Credentials
    return res.status(200).json({
      password: "Incorrect Credentials",
    });
  } catch (e) {
    return res.status(200).json({
      email: "Email Doesn't Exist",
    });
  }
});
