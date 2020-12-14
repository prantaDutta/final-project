import handler from "../../apiHandlers/handler";
import prisma from "../../lib/prisma";

export default handler.post(async (req, res, next) => {
  if (req.token) {
    const { id } = req.body;
    const intId = parseInt(id);
    const user = await prisma.users.findUnique({
      where: {
        id: intId,
      },
    });
    if (user) {
      const userData = {
        id: user.id,
        name: user.name,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
      };
      // console.log(user);
      res.status(200).json(userData);
    } else {
      res.status(422).json({ ERROR: "Error" });
    }
  } else {
    res.status(422).json({ ERROR: "Error" });
  }
  // return res.status(200).send("hello");
  next();
});
