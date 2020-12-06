import { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";
// import { verifyJWTToken } from "../../utils/functions";

// const KEY = "kdjkskASDFSFKDLLDFDKDFDSKDL";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  // return new Promise(async (resolve) => {
  const { token } = req.body;
  console.log(token);
  res.status(200).send(token);
  // resolve();
  // });
  //   console.log(verifyJWTToken(token));
};
