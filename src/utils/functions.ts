import jwt from "jsonwebtoken";

export const verifyJWTToken = (accessToken: string) => {
  return jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: any, user: any) => {
      //   console.log(user);
      if (err) return false;
      else return true;
      // req.user = user;
      // next();
    }
  );
};
