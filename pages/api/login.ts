import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const KEY = "kdjkskASDFSFKDLLDFDKDFDSKDL";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  const { email } = req.body.values;
  // console.log(email);
  if (!email) {
    res.send("Server Error");
  } else {
    const user = await prisma.user.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      res.send("error");
    } else {
      res.json({
        user,
        token: jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          KEY
        ),
      });
    }
  }
};
