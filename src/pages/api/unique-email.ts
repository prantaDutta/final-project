import handler from "../../apiHandlers/handler";
import prisma from "../../lib/prisma";

export default handler.post(async (req, res, next) => {
  if (req.body.email) {
    const { email } = req.body;
    try {
      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        res.json({
          msg: "Email already been taken",
        });
      } else {
        res.json({ msg: "Unique Email" });
      }
    } catch (e) {
      console.log(e);
      res.json({ msg: "Validating" });
    }
  } else {
    res.json({ msg: "Validating" });
  }
  next();
});
