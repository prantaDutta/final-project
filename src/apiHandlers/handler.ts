import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { AUTH_TOKEN_NAME } from "../utils/constants";

export interface NextApiRequestExtended extends NextApiRequest {
  token: string | null;
}

export default nextConnect<NextApiRequestExtended, NextApiResponse>({
  onError(error, _req, res) {
    res
      .status(501)
      .json({ error: `Sorry Something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
}).use((req, _res, next) => {
  req.token = null;
  const cookie = req.cookies;

  const token = cookie[`${AUTH_TOKEN_NAME}`];
  if (token) {
    verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      (err: any, decoded: any) => {
        if (!err && decoded) {
          req.token = decoded;
        }
      }
    );
  }
  next();
});
