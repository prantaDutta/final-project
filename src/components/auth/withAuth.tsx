import React from "react";
import api from "../../utils/api";
import { isLoggedIn, redirectTo } from "../../utils/auth";

export default function withAuth(Component: React.FC<any>) {
  const AuthComponent = (props: any) => {
    return <Component {...props} />;
  };

  AuthComponent.getInitialProps = async (context: any) => {
    const isUserLoggedIn = isLoggedIn(context?.req?.headers?.cookie || "");

    if (!isUserLoggedIn) {
      redirectTo("/login", context);
    }

    const { data } = await api().get("user");
    console.log(data);

    return { user: { isLoggedIn: isUserLoggedIn } };
  };

  return AuthComponent;
}
