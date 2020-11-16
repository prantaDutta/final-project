import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const { email } = req.body;
  // const findEmail = await prisma.user.findOne({
  //   where: {
  //     email,
  //   },
  // });
  // if (findEmail) {
  //   res.json({
  //     errors: {
  //       email: "Email already exist",
  //     },
  //   });
  // } else {
  const hashedPassword = await argon2.hash(req.body.password);
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    },
  });
  console.log(user);
  res.json(user);
  // }
};
