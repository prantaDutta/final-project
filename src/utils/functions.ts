import jwt from "jsonwebtoken";
import { format, sub } from "date-fns";

export const verifyJWTToken = (accessToken: string) => {
  return jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!,
    (err, user) => {
      return {
        err,
        user,
      };
    }
  );
};

export const formatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const sub18Years = (date: Date) => {
  return sub(date, {
    years: 18,
  });
};

export const eightennYearsBackFromNow = () => {
  return sub(new Date(), {
    years: 18,
  });
};
