import bcrypt from "bcrypt";
import { withIronSession } from "next-iron-session";
import { v4 as uuidv4 } from "uuid";
import { sendDataToFauna } from "../../lib/fauna";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

export default withIronSession(async (req, res) => {
  const { name, email, role, password } = req.body.values;

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();
  try {
    const { data }: any = await sendDataToFauna({
      userId,
      name,
      email,
      role,
      password: hashedPassword,
    });
    // const token = sign({ userId }, ACCESS_TOKEN_SECRET);
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
    return res.status(200).json({
      id: data.userId,
      name,
      email,
      role,
    });
  } catch (e) {
    throw new Error("Can't Insert Data");
  }
}, NEXT_IRON_SESSION_CONFIG);
