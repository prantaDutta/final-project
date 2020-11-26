import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { parseISO } from "date-fns";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, role, password, dateOfBirth, gender } = req.body.values;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(dateOfBirth);
  console.log(parseISO(dateOfBirth));

  const user = await prisma.users.create({
    data: {
      name,
      email,
      role,
      gender,
      password: hashedPassword,
      dateOfBirth: parseISO(dateOfBirth),
    },
  });

  if (!user) {
    console.log("something is wrong");
    res.send("error");
  } else {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
    // console.log(accessToken);
    res.json({ accessToken });
  }
};
