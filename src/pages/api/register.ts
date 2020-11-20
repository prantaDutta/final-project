import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, role, password } = req.body.values;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      role,
      password: hashedPassword,
    },
  });

  if (!user) {
    res.send("error");
  } else {
    const accessToken = jwt.sign(user.email, process.env.ACCESS_TOKEN_SECRET!);
    // console.log(accessToken);
    res.json({ accessToken });
  }
};
