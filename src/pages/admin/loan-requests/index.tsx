import { ThreeDots } from "@agney/react-loading";
import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import React, { useMemo } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ReactLoader from "../../../components/ReactLoader";
import Table from "../../../components/ReactTable/Table";
import { BASE_URL, NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { redirectToLogin } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";

interface VerificationRequestsProps {
  user: ModifiedUserData;
}

const LoanRequests: React.FC<VerificationRequestsProps> = ({ user }) => {
  const { data, isValidating } = useSWR(BASE_URL + "/api/admin/loan-requests");
  const columns = useMemo(() => loanRequestsTableHeader, [data]);
  const tableData = useMemo(() => data, [data]);
  return (
    <DashboardLayout data={user}>
      <div className="p-4">
        <h1 className="text-3xl">Loan Requests</h1>
      </div>
      {!isValidating ? (
        data && data.length > 0 ? (
          <Table
            data={tableData}
            columns={columns}
            tableClass="w-full shadow-lg bg-white text-center"
            thClass="bg-primary font-semibold border px-8 py-4"
            tdClass="font-semibold border px-8 py-4"
            pagination={true}
          />
        ) : (
          <p>You Don't have new Verification Requests</p>
        )
      ) : null}
      {isValidating && (
        <button
          className="bg-transparent text-primary p-3 w-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
        >
          <ReactLoader component={<ThreeDots width="50" />} />
        </button>
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async (context: NextPageContext) => {
    const user = (context.req as any).session.get("user");
    if (!user) {
      redirectToLogin(context.req, context.res);
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default LoanRequests;

export const loanRequestsTableHeader = [
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Monthly Installment",
    accessor: "monthlyInstallment",
  },
  {
    Header: "Interest Rate",
    accessor: "interestRate",
  },
  {
    Header: "Loan Duration",
    accessor: "loanDuration",
  },
  {
    Header: "ModifiedMonthly Installment",
    accessor: "modifiedMonthlyInstallment",
  },
];
