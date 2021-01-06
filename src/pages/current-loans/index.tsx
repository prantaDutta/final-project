import { ThreeDots } from "@agney/react-loading";
import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ReactLoader from "../../components/ReactLoader";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToLogin } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";

interface currentLoansProps {
  user: ModifiedUserData;
}

const currentLoans: React.FC<currentLoansProps> = ({ user }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Current Loans</h1>
        <button
          onClick={() => router.push("/current-loans/new-loan")}
          className="bg-primary text-white p-3 w-1/3 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
        >
          {submitting ? (
            <ReactLoader component={<ThreeDots width="50" />} />
          ) : (
            "New Loan"
          )}
        </button>
      </div>
      <div>Your Loans</div>
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async (context: NextPageContext) => {
    const user = (context.req as any).session.get("user");
    if (!user) {
      redirectToLogin(context?.req, context?.res);
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default currentLoans;
