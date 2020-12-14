import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { baseURL } from "../utils/constants";

export const isAuthenticated = async (context: NextPageContext) => {
  const cookie = context.req?.headers.cookie;

  const resp = await fetch(`${baseURL}/api/is-authenticated`, {
    headers: {
      cookie: cookie!,
    },
  });

  if (resp.status === 422 && !context.req) {
    //  On client
    const router = useRouter();
    router.replace("/login");
  } else if (resp.status === 422 && context.req) {
    context.res?.writeHead(302, {
      Location: `${baseURL}/login`,
    });
    context.res?.end();
  }
};
