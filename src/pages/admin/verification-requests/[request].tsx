import { ThreeDots } from "@agney/react-loading";
import axios from "axios";
import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ReactLoader from "../../../components/ReactLoader";
import {
  BASE_URL,
  isProduction,
  NEXT_IRON_SESSION_CONFIG,
  uuidFormatRegex,
} from "../../../utils/constants";
import { verificationRequestTableHeader } from "../../../utils/constantsArray";
import {
  downloadImage,
  isObject,
  objectToArray,
  redirectToErrorPage,
  redirectToLogin,
} from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";

interface requestProps {
  user: ModifiedUserData;
  request: string;
}

interface ShowMultipleImageProps {
  photo: Array<any>;
}

const ShowMultipleImage: React.FC<ShowMultipleImageProps> = ({ photo }) => {
  const statements = (photo[1] as any).split("#");
  statements.splice(-1, 1);
  statements.map((statement: string) => {
    return (
      <ShowImage
        key={statement}
        name="BankAccount Statements"
        url={statement}
      />
    );
  });
  return <></>;
};

interface ShowImageProps {
  name: string;
  url: string;
}

const ShowImage: React.FC<ShowImageProps> = ({ name, url }) => {
  return (
    <tr key={name}>
      <td className="font-semibold border px-8 py-4 capitalize">{name}</td>
      <td className="font-semibold border px-8 py-4">
        <Image
          height="100"
          width="100"
          className=""
          alt={name}
          src={`/uploads/verificationPapers/${url}`}
        />
        <span
          onClick={() =>
            downloadImage(
              BASE_URL + `/uploads/verificationPapers/${url}`,
              url as string
            )
          }
          className="text-md block text-primary cursor-pointer"
        >
          Download Image
        </span>
      </td>
    </tr>
  );
};

const request: React.FC<requestProps> = ({ user, request }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { data, isValidating } = useSWR(
    BASE_URL + `/api/admin/verification-requests/${request}`
  );
  let photos = data?.verificationPhotos
    ? Object.entries(data?.verificationPhotos)
    : null;

  const bankStatements = data?.verificationPhotos?.bankAccountStateMents
    ? data?.verificationPhotos?.bankAccountStateMents
    : null;
  if (photos) delete (photos as any)?.bankAccountStateMents;
  let statementsArray = bankStatements ? bankStatements.split("#") : null;
  if (statementsArray) {
    statementsArray.splice(-1, 1);
    statementsArray.map((state: any, i: number) => {
      photos?.push(["bankAccountStatements " + (i + 1).toString(), state]);
    });
  }
  const email = data?.email ? data?.email : null;
  const userId = data?.userId ? data?.userId : null;
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between text-gray-900">
        <h1 className="text-3xl font-bold">Verification Check</h1>
        <button
          onClick={async () => {
            setSubmitting(true);
            const { data } = await axios.post(
              BASE_URL + "/api/admin/verification-requests/update",
              {
                email,
              }
            );
            if (isProduction) console.log(data);
            setSubmitting(false);
            mutate(`/admin/verification-requests/${userId}`);
            router.back();
          }}
          className="bg-primary text-white p-3 w-1/3 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
        >
          {submitting ? (
            <ReactLoader component={<ThreeDots width="50" />} />
          ) : (
            "Mark As Verified"
          )}
        </button>
      </div>

      {isValidating && !data ? (
        <button
          className="bg-transparent text-primary p-3 mt-5 w-full tracking-wide
                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                    shadow-lg transition-css"
        >
          <ReactLoader component={<ThreeDots width="50" />} />
        </button>
      ) : (
        <table className="w-full shadow-lg bg-white text-center mt-5">
          <thead>
            <tr>
              {verificationRequestTableHeader.map((header: string) => (
                <th
                  key={header}
                  className="bg-primary font-semibold border px-8 py-4 text-white capitalize"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data &&
              objectToArray(data).map((d) => {
                if (isObject(d[1])) {
                  return null;
                }
                return (
                  <tr key={d[0]}>
                    <td className="font-semibold border px-8 py-4 capitalize">
                      {d[0]}
                    </td>
                    <td className="font-semibold border px-8 py-4 capitalize">
                      {d[1]}
                    </td>
                  </tr>
                );
              })}
            {photos &&
              photos.map((photo) => {
                if (photo[0] === "bankAccountStateMents") {
                  return (
                    <ShowMultipleImage
                      key={new Date().toString()}
                      photo={photo}
                    />
                  );
                } else {
                  return (
                    <ShowImage
                      key={photo as any}
                      name={photo[0]}
                      url={(photo as any)[1]}
                    />
                  );
                }
              })}
          </tbody>
        </table>
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

    const request: any = context.query.request;
    if (!uuidFormatRegex.test(request)) {
      redirectToErrorPage(context.req, context.res);
    }

    return {
      props: { user, request },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default request;
