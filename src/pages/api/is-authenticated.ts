import handler from "../../apiHandlers/handler";

export default handler.get(async (req, res, next) => {
  if (req.token) {
    res.status(200).json({ token: req.token });
  } else {
    res.status(200).json({ token: null });
  }
  next();
});
