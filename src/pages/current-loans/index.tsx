import { Grid } from "@agney/react-loading";
import axios from "axios";
import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ReactLoader from "../../components/ReactLoader";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToLogin } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import { NewLoanFormValues } from "./new-loan";

interface currentLoansProps {
  user: ModifiedUserData;
}

const currentLoans: React.FC<currentLoansProps> = ({ user }) => {
  const router = useRouter();
  const { data, isValidating } = useSWR(
    ["api/user/get-all-loans", user.userId],
    async (url, userId) => {
      const res = await axios.post(url, { userId });
      return res.data;
    }
  );
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
          New Loan
        </button>
      </div>
      <div className="mt-5">
        <p className="text-xl font-semibold my-5">Your Loans</p>
        <div>
          {isValidating && !data ? (
            <button
              className="bg-transparent text-primary p-3 w-full tracking-wide
                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                    shadow-lg transition-css"
            >
              <ReactLoader component={<Grid width="50" />} />
            </button>
          ) : (
            <table className="w-full shadow-lg bg-white text-center">
              <thead>
                <tr>
                  {CurrentLoanTableHeader.map((header: string) => (
                    <th
                      key={header}
                      className="bg-primary font-semibold border px-8 py-4 text-white"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data &&
                  data.map((loanData: any) => {
                    const {
                      amount,
                      interestRate,
                      loanDuration,
                      monthlyInstallment,
                    }: NewLoanFormValues = loanData.data;
                    return (
                      <tr key={loanData}>
                        <td className="font-semibold border px-8 py-4">
                          {amount}
                        </td>
                        <td className="font-semibold border px-8 py-4">
                          {interestRate}
                        </td>
                        <td className="font-semibold border px-8 py-4">
                          {loanDuration}
                        </td>
                        <td className="font-semibold border px-8 py-4">
                          {monthlyInstallment}
                        </td>
                        <td className="font-semibold border px-8 py-4">
                          {loanData.data.mode}
                        </td>
                        <td className="font-semibold border px-8 py-4">N/A</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
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

export const CurrentLoanTableHeader = [
  "Loan Amount",
  "Loan Interest",
  "Loan Duration",
  "Monthly Installment",
  "Loan Mode",
  "Loan Period",
];
