import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    if (req.body.email) {
      const { email, id } = req.body;

      if (email && id) {
        try {
          const user = await prisma.users.findUnique({
            where: {
              id,
            },
          });
          if (user && user.email === email) {
            res.json({
              msg: "Email already been taken By this user",
            });
            resolve();
          } else if (user && user.email !== email) {
            const newUser = await prisma.users.findUnique({
              where: {
                email,
              },
            });

            if (newUser) {
              res.json({
                msg: "Email already been taken",
              });
              resolve();
            } else {
              res.json({ msg: "Unique Email" });
              resolve();
            }
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
    } else {
      res.send("Validating");
      reject();
    }
  });
};
