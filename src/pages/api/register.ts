import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import handler from "../../apiHandlers/handler";

export default handler.post(async (req, res, next) => {
  const { name, email, role, password, dateOfBirth, gender } = req.body.values;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      name,
      email,
      role,
      gender,
      password: hashedPassword,
      dateOfBirth,
    },
  });

  if (!user) {
    console.log("something is wrong");
    res.json({ error: "Something Went Wrong" });
  } else {
    const token = jwt.sign(
      user.id.toString(),
      process.env.ACCESS_TOKEN_SECRET!
    );
    res.json({ token });
  }
  next();
});
