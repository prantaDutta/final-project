import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    },
  });

  res.json(user);
  // }
};
