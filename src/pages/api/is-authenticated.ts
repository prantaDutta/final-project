import handler from "../../apiHandlers/handler";

export default handler.get(async (req, res, next) => {
  // console.log("token: ", req.token);
  if (req.token !== null) {
    res.status(200).json({ token: req.token });
  } else {
    res.status(422).json({ token: null });
  }
  next();
});
