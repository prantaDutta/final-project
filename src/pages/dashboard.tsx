import React from "react";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { NextPageContext } from "next";
import { isAuthenticated } from "../apiHandlers/isAuthenticated";
import { AUTH_TOKEN_NAME, baseURL } from "../utils/constants";
import { verifyJWTToken } from "../utils/functions";

interface dashboardProps {}

const dashboard: React.FC<dashboardProps> = () => {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  await isAuthenticated(context);
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
  const data = await response.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default dashboard;
