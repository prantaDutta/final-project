import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    // console.log(req.body);
    if (req.body.email) {
      const { email } = req.body;
      //   res.json({loca
      //     email,
      //   });
      try {
        const user = await prisma.users.findUnique({
          where: {
            email,
          },
        });
        if (user) {
          res.json({
            msg: "Email already been taken",
          });
          resolve();
        } else {
          res.json({ msg: "Unique Email" });
          resolve();
        }
      } catch (e) {
        console.log(e);
        res.send("Validating");
        reject();
      }
    } else {
      res.send("Validating");
      reject();
    }
  });
};
