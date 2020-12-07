import Redis from "ioredis";

const client = new Redis();

client.on("connect", () => {
  console.log("Redis is CONNECTED!!! 🙋 : & RUNNING!!! 🤟");
});

client.on("error", (err: Error) => {
  console.error("There was an error: 🤢", err);
});

process.on("exit", () => {
  console.log("Exiting Redis 😞");
  client.quit();
});

export default client;
