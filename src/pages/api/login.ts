import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    const { email } = req.body.values;
    if (!email) {
      res.send("Server Error");
      reject();
    } else {
      try {
        const user = await prisma.users.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          res.send("error");
          reject();
        } else {
          const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
          res.status(200).json({ token });
          resolve();
        }
      } catch (e) {
        console.log(e);
        reject();
      }
    }
  });
};
