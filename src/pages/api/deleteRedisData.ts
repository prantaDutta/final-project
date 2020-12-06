import { NextApiRequest, NextApiResponse } from "next";
import client from "../../redis/redisClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  // return new Promise(async (resolve, reject) => {
  const { key } = req.body;
  client.del(key, function (err: any, value: any) {
    if (err) {
      console.log(err);
      // reject();
      return res.status(422).json(err);
    }
    if (value != null) {
      // const data = JSON.parse(value);
      // resolve();
      console.log("Getting Data from Redis");
      return res.status(200).json({ ok: "OK" });
    }
    // reject();
    return res.status(422).json({ error: "You Messed Up" });
  });
  // });
  // return res.status(422).json({ error: "You Messed Up" });
};
