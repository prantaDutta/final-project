import { NextApiRequest, NextApiResponse } from "next";
import client from "../../redis/redisClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  // return new Promise(async (resolve, reject) => {
  const { key, value } = req.body;
  client.set(key, JSON.stringify(value), (err) => {
    if (err) {
      // reject();
      return res.status(422).json(err);
    }
    console.log("Saving Data to Redis");
    res.status(200).json(value);
    // resolve();
  });
  // });
  // return res.status(422).json({ error: "You Messed Up" });
};
