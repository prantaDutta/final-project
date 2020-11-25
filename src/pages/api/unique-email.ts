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
    try {
      const user = await prisma.users.findOne({
        where: {
          email,
        },
      });
      if (user) {
        res.json({
          msg: "Email already been taken",
        });
      } else {
        res.json({ msg: "Unique Email" });
      }
    } catch (e) {
      console.log(e);
      res.send("Validating");
    }
  } else {
    res.send("Validating");
  }
};
