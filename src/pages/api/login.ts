import { compare } from "bcrypt";
import { withIronSession } from "next-iron-session";
import { getUserByIndex } from "../../lib/fauna";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { UserAuthValues } from "../../utils/randomTypes";

// export default handler.post(async (req, res) => {
export default withIronSession(async (req, res) => {
  const { email, password } = req.body.values;
  if (!email || !password) {
    return res.status(406).json({
      error: "Something Went Wrong",
    });
  }

  try {
    const data: UserAuthValues = await getUserByIndex(email, "search_by_email");
    if (await compare(password, data.password!)) {
      // password matched
      // const token = sign(
      //   { userId: data.userId.toString() },
      //   ACCESS_TOKEN_SECRET
      // );
      // res.setHeader(
      //   "Set-Cookie",
      //   cookie.serialize(AUTH_TOKEN_NAME, token, {
      //     httpOnly: true,
      //     secure: isProduction,
      //     sameSite: "strict",
      //     maxAge: 60 * 60 * 24 * 3, // 3 days
      //     path: "/",
      //   })
      // );
      req.session.set("user", data);
      await req.session.save();
      const { userId, name, email, role } = data;
      return res.status(200).json({
        userId,
        name,
        email,
        role,
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
}, NEXT_IRON_SESSION_CONFIG);
