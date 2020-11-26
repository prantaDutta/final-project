import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  if (req.body.email) {
    const { email, id } = req.body;
    //   res.json({
    //     email,
    //   });
    // console.log(email, id);
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
        } else if (user && user.email !== email) {
          const newUser = await prisma.users.findUnique({
            where: {
              email,
            },
          });

          if (newUser) {
            console.log(newUser);
            res.json({
              msg: "Email already been taken",
            });
          } else {
            res.json({ msg: "Unique Email" });
          }
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
  } else {
    res.send("Validating");
  }
};
