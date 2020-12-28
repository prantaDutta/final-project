import { NextPageContext } from "next";
import { useRouter } from "next/router";
import DBClient from "../lib/prisma";
import { AUTH_TOKEN_NAME, baseURL } from "../utils/constants";
import { verifyJWTToken } from "../utils/functions";
import { ModifiedUserData } from "../utils/randomTypes";

const prisma = DBClient.getInstance().prisma;

export const isAuthenticated = async (context: NextPageContext) => {
  const cookie = context.req?.headers.cookie;
  if (cookie) {
    let token = cookie.slice(`${AUTH_TOKEN_NAME}`.length + 1);
    const id = verifyJWTToken(token);
    if (id) {
      const user = await prisma.users.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      // console.log("user: ", user);
      if (user) {
        const userData: ModifiedUserData = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        // console.log(user);
        return userData;
      }
    }
  }
  redirectToLogin(context);
};

export const redirectToLogin = (context: NextPageContext) => {
  if (!context.req) {
    //  On client
    const router = useRouter();
    return router.replace("/login");
  } else if (context.req) {
    // On Server
    context.res?.writeHead(302, {
      Location: `${baseURL}/login`,
    });
    return context.res?.end();
  }
};
