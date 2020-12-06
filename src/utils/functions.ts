import jwt from "jsonwebtoken";
import { format, sub } from "date-fns";
import axios from "axios";

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

export const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

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

export const objectToArray = (obj: Record<string, string>) => {
  return Object.keys(obj).map((key) => [key, obj[key]]);
};

export const isEmptyObj = (obj: Record<any, any>) => {
  return Object.keys(obj).length === 0;
};

export const isObject = (obj: any) => {
  return obj != null && obj.constructor.name === "Object";
};

// export const cachedToken = async function () {
//   // return new Promise(async (resolve, reject) => {
//   try {
//     axios
//       .post("/api/getRedisData", {
//         key: process.env.AUTH_TOKEN_NAME!,
//       })
//       .then((res) => {
//         console.log("get:", res.data);
//         // resolve(res.data);
//         return res.data;
//       });
//   } catch (e) {
//     console.log(e);
//     return e;
//     // reject
//   }
//   // });
// };
