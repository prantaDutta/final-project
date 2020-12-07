import handler from "../../apiHandlers/handler";
import client from "../../redis/redisClient";

export default handler
  // getting data from redis
  .get((req, res, next) => {
    const { key } = req.query;
    client.get(key.toString(), function (err: any, value: any) {
      if (!err && value) {
        const data = JSON.parse(value);
        res.status(200).json({ data });
      } else {
        res.status(422).json({ err });
      }
      next();
    });
  }) // saving data to redis
  .put((req, res, next) => {
    const { key, value } = req.body;
    client.set(key, JSON.stringify(value), (err) => {
      if (!err && value) {
        res.status(200).json({ value });
      } else {
        res.status(422).json({ err });
      }
      next();
    });
  }) // deleting data from redis
  .delete((req, res, next) => {
    const { key } = req.body;
    client.del(key, function (err: any, value: any) {
      const data = JSON.parse(value);
      if (!err && value) {
        res.status(200).json({ data });
      } else {
        res.status(422).json({ err });
      }
      next();
    });
  });
