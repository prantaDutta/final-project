import { ThreeDots } from "@agney/react-loading";
import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ReactLoader from "../../../components/ReactLoader";
import { BASE_URL, NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { redirectToLogin } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";

interface VerificationRequestsProps {
  user: ModifiedUserData;
}

const VerificationRequests: React.FC<VerificationRequestsProps> = ({
  user,
}) => {
  const { data, isValidating } = useSWR(
    BASE_URL + "/api/admin/verification-requests"
  );

  return (
    <DashboardLayout data={user}>
      <div className="p-4">
        <h1 className="text-3xl">Verification Requests</h1>
      </div>
      <table className="w-full shadow-lg bg-white text-center">
        <thead>
          <tr>
            <th className="bg-primary font-semibold border px-8 py-4">Name</th>
            <th className="bg-primary font-semibold border px-8 py-4">Role</th>
            <th className="bg-primary font-semibold border px-8 py-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {!isValidating ? (
            data && data.length > 0 ? (
              data.map((d: any, i: number) => {
                const { name, role, userId } = d.data;
                return (
                  <Link
                    key={userId}
                    href={`/admin/verification-requests/${userId}`}
                  >
                    <tr
                      className={`${
                        i % 2 != 0 ? "bg-gray-300" : ""
                      } cursor-pointer`}
                    >
                      <td className="font-semibold border px-8 py-4">{name}</td>
                      <td className="font-semibold border px-8 py-4">{role}</td>
                      <td className="font-semibold border px-8 py-4">
                        <a className={`btn bg-primary text-white px-3 py-2`}>
                          Check
                        </a>
                      </td>
                    </tr>
                  </Link>
                );
              })
            ) : (
              <tr>
                <td colSpan={3}>You Don't have new Verification Requests</td>
              </tr>
            )
          ) : null}
        </tbody>
      </table>
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

export default VerificationRequests;
