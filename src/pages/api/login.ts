import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import handler from "../../apiHandlers/handler";

export default handler.post(async (req, res, next) => {
  const { email } = req.body.values;
  if (!email) {
    res.send("Server Error");
  } else {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        res.send("error");
      } else {
        const token = jwt.sign(
          user.id.toString(),
          process.env.ACCESS_TOKEN_SECRET!
        );
        res.status(200).json({ token });
      }
    } catch (e) {
      console.log(e);
    }
  }
  next();
});
