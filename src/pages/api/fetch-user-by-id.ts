import handler from "../../apiHandlers/handler";

export default handler.get(async (req, res, next) => {
  console.log(req);
  next();
});
