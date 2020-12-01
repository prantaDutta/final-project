import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";

// const KEY = "kdjkskASDFSFKDLLDFDKDFDSKDL";

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
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
          // console.log(accessToken);
          res.json({ accessToken });
          resolve();
        }
      } catch (e) {
        console.log(e);
        reject();
      }
    }
  });
};
