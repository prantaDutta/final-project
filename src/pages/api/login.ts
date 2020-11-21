import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// const KEY = "kdjkskASDFSFKDLLDFDKDFDSKDL";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  const { email } = req.body.values;
  // console.log(email);
  if (!email) {
    res.send("Server Error");
  } else {
    const user = await prisma.users.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      res.send("error");
    } else {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
      // console.log(accessToken);
      res.json({ accessToken });
    }
  }
};
