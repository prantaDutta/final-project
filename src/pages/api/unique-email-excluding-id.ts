import handler from "../../apiHandlers/handler";
import prisma from "../../lib/prisma";

export default handler.post(async (req, res, next) => {
  if (req.body.email) {
    const { email, id } = req.body;

    if (email && id) {
      try {
        const user = await prisma.users.findUnique({
          where: {
            id,
          },
        });
        if (user && user.email === email) {
          res.status(200).json({
            msg: "Email already been taken By this user",
          });
        } else if (user && user.email !== email) {
          const newUser = await prisma.users.findUnique({
            where: {
              email,
            },
          });

          if (newUser) {
            res.json({
              msg: "Email already been taken",
            });
          } else {
            res.status(200).json({ msg: "Unique Email" });
          }
        } else {
          res.status(200).json({ msg: "Unique Email" });
        }
      } catch (e) {
        console.log(e);
        res.status(200).send("Validating");
      }
    } else {
      res.status(200).send("Validating");
    }
  } else {
    res.status(200).send("Validating");
  }
  next();
});
