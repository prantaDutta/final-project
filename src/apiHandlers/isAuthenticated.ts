import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { prisma } from "../lib/prisma";
import { AUTH_TOKEN_NAME, BASE_URL } from "../utils/constants";
import { verifyJWTToken } from "../utils/functions";
import { ModifiedUserData } from "../utils/randomTypes";

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
      if (user) {
        const userData: ModifiedUserData = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
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
      Location: `${BASE_URL}/login`,
    });
    return context.res?.end();
  }
};
