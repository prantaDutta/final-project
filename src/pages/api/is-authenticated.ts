import { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";
// import { verifyJWTToken } from "../../utils/functions";

// const KEY = "kdjkskASDFSFKDLLDFDKDFDSKDL";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  const { token } = req.body;
  console.log(token);
  res.send(token);

  //   console.log(verifyJWTToken(token));
};
