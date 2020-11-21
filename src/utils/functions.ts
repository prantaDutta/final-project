import jwt from "jsonwebtoken";

export const verifyJWTToken = (accessToken: string) => {
  return jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: any, decoded: any) => {
      //   console.log(user);
      if (!err) return decoded;
      // else return user;
      // req.user = user;
      // next();
    }
  );
};
