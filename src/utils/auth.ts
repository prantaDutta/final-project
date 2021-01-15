import cookie from "cookie";
import Cookies from "js-cookie";
import { default as router } from "next/router";

export const isLoggedIn = (reqCookies = null) => {
  // if we don't have request cookies, get the cookie from client
  if (!reqCookies) {
    return !!Cookies.get("ticket_management_is_user_logged_in");
  }

  // otherwise get cookie from server
  return !!cookie.parse(reqCookies!).ticket_management_is_user_logged_in;
};

export const logIn = () => {
  Cookies.set("ticket_management_is_user_logged_in", "true", {
    expires: 86400,
    sameSite: "lax",
  });

  router.push("/dashboard");
};

export const logOut = () => {
  if (typeof window !== "undefined") {
    // remove logged in user's cookie and redirect to login page
    Cookies.remove("ticket_management_is_user_logged_in", {
      expires: 86400,
      sameSite: "lax",
    });

    router.push("/login");
  }
};

export const redirectTo = (destination: any, { res, status }: any = {}) => {
  if (res) {
    res.writeHead(status || 302, { Location: destination });
    res.end();
  } else {
    if (destination[0] === "/" && destination[1] !== "/") {
      router.push(destination);
    } else {
      window.location = destination;
    }
  }
};
