import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import handler from "../../apiHandlers/handler";

export default handler.post(async (req, res, next) => {
  if (req.body.password) {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // password match
      res.json({ msg: "Password Matched" });
    } else {
      // password did not match
      res.json({
        msg: "Wrong Credentials",
      });
    }
  } else {
    res.json({
      msg: "Validating",
    });
  }
  next();
});
