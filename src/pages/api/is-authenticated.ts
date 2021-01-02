import handler from "../../apiHandlers/handler";

export default handler.get((req, res) => {
  console.log("token: ", req.token);
  if (req.token !== null) {
    return res.status(200).json({ token: req.token });
  }

  return res.status(422).json({ token: null });
});
