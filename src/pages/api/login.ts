import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import Axios from "axios";

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
          try {
            Axios.post("/api/setRedisData", {
              key: process.env.AUTH_TOKEN_NAME!,
              value: accessToken,
            }).then((axiosResponse) => {
              console.log("Response from login.ts: ", axiosResponse.data);
              res.status(200).json({ accessToken });
              resolve();
            });
          } catch (e) {
            console.log(e);
            res.status(422).json({ error: "ERROR" });
            reject();
          }
        }
      } catch (e) {
        console.log(e);
        reject();
      }
    }
  });
};
