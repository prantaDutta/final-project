import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      email,
      role,
      password,
      dateOfBirth,
      gender,
    } = req.body.values;

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
      res.send("error");
      reject();
    } else {
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
      // console.log(accessToken);
      res.json({ token });

      // }
      resolve();
    }
  });
};
