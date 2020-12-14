import React from "react";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { NextPageContext } from "next";
import { isAuthenticated } from "../apiHandlers/isAuthenticated";

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

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default dashboard;
