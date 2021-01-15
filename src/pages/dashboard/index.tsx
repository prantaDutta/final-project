import React from "react";
import withAuth from "../../components/auth/withAuth";
import DashboardContent from "../../components/dashboard/DashboardContent";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { ModifiedUserData } from "../../utils/randomTypes";

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

// export const getServerSideProps = withIronSession(
//   async (context: NextPageContext) => {
//     const user = (context.req as any).session.get("user");
//     if (!user) {
//       redirectToLogin(context?.req, context?.res);
//       return { props: {} };
//     }

//     return {
//       props: { user },
//     };
//   },
//   NEXT_IRON_SESSION_CONFIG
// );

export default withAuth(dashboard);
