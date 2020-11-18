import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  if (req.body.email) {
    const { email } = req.body;
    //   res.json({
    //     email,
    //   });
    const findEmail = await prisma.user.findOne({
      where: {
        email,
      },
    });
    if (findEmail) {
      res.json({
        msg: "Email already been taken",
      });
    } else {
      res.json({ msg: "Unique Email" });
    }
  } else {
    res.send("Validating");
  }
};
