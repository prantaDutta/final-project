import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.password) {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await prisma.user.findOne({
      where: {
        email,
      },
    });

    if (user && (await argon2.verify(user.password, password))) {
      // password match
      res.json({ msg: "Password Matching" });
    } else {
      // password did not match
      res.json({
        msg: "Wrong Credentials",
      });
    }
  } else {
    res.send("Validating");
  }
};
