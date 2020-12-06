import Redis from "ioredis";
// import url from "url";

// const port = Number(process.env.REDIS_PORT);
// const { hostname } = url.parse(process.env.REDIS_URL ?? "");
const client = new Redis();

client.on("connect", () => {
  console.log("Redis is connected!");
});

client.on("error", (err: Error) => {
  console.error("There was an error: ", err);
});

process.on("exit", () => {
  client.quit();
});

export default client;

// export const getRedisData = (key: any) => {
//   client.get(key, function (err: any, value: any) {
//     if (err) {
//       console.log(err);
//       return err;
//     }
//     if (value != null) {
//       const data = JSON.parse(value);
//       console.log("Getting Data from Redis");
//       return data;
//     }
//   });
// };
