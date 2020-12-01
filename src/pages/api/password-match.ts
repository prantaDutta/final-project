import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    if (req.body.password) {
      const { email, password } = req.body;
      // console.log(req.body);
      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        // password match
        res.json({ msg: "Password Matching" });
        resolve();
      } else {
        // password did not match
        res.json({
          msg: "Wrong Credentials",
        });
        resolve();
      }
    } else {
      res.send("Validating");
      reject();
    }
  });
};
