import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  const user = await prisma.user.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    res.json({
      errors: {
        email: "Email doesn't exist",
      },
    });
  } else {
    try {
      if (await argon2.verify(user.password, req.body.password)) {
        // password match
        res.json({
          user,
        });
      } else {
        // password did not match
        res.json({
          errors: {
            password: "Password doesn't match",
          },
        });
      }
    } catch (err) {
      // internal failure
      console.log(err);
    }
  }
};
