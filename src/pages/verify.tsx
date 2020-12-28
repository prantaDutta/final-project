import React, { useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import StepperIcons, { icons } from "../components/verification/StepperIcons";
import Contact from "../components/verify/Contact";
import Images from "../components/verify/Images";
import Papers from "../components/verify/Papers";
import Personal from "../components/verify/Personal";

interface verifyProps {}

const showVerifyComponent = (step: number) => {
  switch (step) {
    case 0:
      return <Personal />;
    case 1:
      return <Contact />;
    case 2:
      return <Papers />;
    case 3:
      return <Images />;
    default:
      return;
  }
};

const verify: React.FC<verifyProps> = ({}) => {
  const [step, setStep] = useState<number>(0);
  return (
    <DashboardLayout>
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
        <div>{showVerifyComponent(step)}</div>
        {/* <button onClick={() => setStep(step + 1)}>Next</button>
        <button onClick={() => setStep(step - 1)}>Previous</button> */}
      </div>
    </DashboardLayout>
  );
};

export default verify;
