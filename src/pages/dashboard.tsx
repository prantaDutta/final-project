import { withIronSession } from "next-iron-session";
import React from "react";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { BASE_URL, NEXT_IRON_SESSION_CONFIG } from "../utils/constants";
import { ModifiedUserData } from "../utils/randomTypes";

interface dashboardProps {
  user: ModifiedUserData;
}

const dashboard: React.FC<dashboardProps> = ({ user }) => {
  return (
    <DashboardLayout data={user}>
      <DashboardContent />
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get("user");
  if (!user) {
    res.status(302).redirect(BASE_URL + "/login");
    return { props: {} };
  }

  return {
    props: { user },
  };
}, NEXT_IRON_SESSION_CONFIG);

export default dashboard;
