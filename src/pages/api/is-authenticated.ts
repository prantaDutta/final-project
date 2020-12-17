import handler from "../../apiHandlers/handler";

export default handler.get(async (req, res) => {
  if (req.token !== null) {
    return res.status(200).json({ token: req.token });
  }

  return res.status(422).json({ token: null });
});
