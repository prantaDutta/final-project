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
    const user = await prisma.user.findOne({
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

      // res.json({
      //   user,
      //   token: jwt.sign(
      //     {
      //       id: user.id,
      //       email: user.email,
      //     },
      //     KEY
      //   ),
      // });
    }
  }
};

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: NextApiErr, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }
