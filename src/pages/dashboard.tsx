import { NextPageContext } from "next";
import React, { useContext, useEffect } from "react";
import { isAuthenticated } from "../apiHandlers/isAuthenticated";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AuthContext } from "../contexts/AuthContext";
import { ModifiedUserData } from "../utils/randomTypes";

interface dashboardProps {
  data: ModifiedUserData;
}

const dashboard: React.FC<dashboardProps> = ({ data }) => {
  const { changeUserData } = useContext(AuthContext);

  useEffect(() => changeUserData(data), []);

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  // The following function checks whether the user is authenticated and returns the userdata
  const data = await isAuthenticated(context);
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default dashboard;
