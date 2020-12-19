import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { AUTH_TOKEN_NAME, baseURL } from "../utils/constants";
import { verifyJWTToken } from "../utils/functions";

export const isAuthenticated = async (context: NextPageContext) => {
  const cookie = context.req?.headers.cookie;
  const resp = await fetch(`${baseURL}/api/is-authenticated`, {
    headers: {
      cookie: cookie!,
    },
  });
  console.clear();
  if (resp.status === 422 && !context.req) {
    //  On client
    const router = useRouter();
    return router.replace("/login");
  } else if (resp.status === 422 && context.req) {
    // On Server
    context.res?.writeHead(302, {
      Location: `${baseURL}/login`,
    });
    return context.res?.end();
  } else {
    const cookie = context.req?.headers.cookie!;
    let token = cookie.slice(`${AUTH_TOKEN_NAME}`.length + 1);
    const id = verifyJWTToken(token);
    const response = await fetch(`${baseURL}/api/fetch-user-by-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookie!,
      },
      body: JSON.stringify({ id }),
    });
    return response.json();
  }
};

export const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    const router = useRouter();
    return router.replace("/login");
  }
  return;
};
