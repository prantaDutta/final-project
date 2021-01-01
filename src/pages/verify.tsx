import { NextPageContext } from "next";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isAuthenticated } from "../apiHandlers/isAuthenticated";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Contact from "../components/verify/Contact";
import Images from "../components/verify/Images";
import Papers from "../components/verify/Papers";
import Personal from "../components/verify/Personal";
import StepperIcons, { icons } from "../components/verify/StepperIcons";
import { authenticatedUserData } from "../states/userStates";
import { verificationStep } from "../states/verificationStates";
import { ModifiedUserData } from "../utils/randomTypes";

interface showVerifyComponentProps {
  step: number;
  role: string;
}

const ShowVerifyComponent: React.FC<showVerifyComponentProps> = ({
  step,
  role,
}) => {
  switch (step) {
    case 0:
      return <Personal />;
    case 1:
      return <Contact />;
    case 2:
      console.log("role", role);
      return role === "lender" ? <Images /> : <Papers />;
    case 3:
      return <Images />;
    default:
      return <></>;
  }
};

interface verifyProps {
  data: ModifiedUserData;
}

const verify: React.FC<verifyProps> = ({ data }) => {
  const [step] = useRecoilState(verificationStep);
  const [, changeUserData] = useRecoilState(authenticatedUserData);

  const { role } = data;
  useEffect(() => changeUserData(data));
  return (
    <DashboardLayout data={data}>
      <div className="p-5">
        <p className=" font-medium md:font-2xl text-xl md:text-4xl text-center">
          Account Verification
        </p>
        <div className="flex items-center mb-4 p-4">
          {icons.map((item, index) => (
            <StepperIcons
              key={index}
              index={index}
              item={item}
              isDone={step > index}
            />
          ))}
        </div>

        <ShowVerifyComponent role={role} step={step} />
      </div>
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

export default verify;
