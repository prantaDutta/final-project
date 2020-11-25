import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { useState } from "react";
import FormikTextField from "../components/shared/FormikTextField";
import DashboardLayout from "../components/layouts/DashboardLayout";
import StepperIcons, { icons } from "../components/verification/StepperIcons";
import { sub18Years, formatDate } from "../utils/functions";

interface verifyProps {}

const verify: React.FC<verifyProps> = ({}) => {
  return (
    <DashboardLayout>
      <div className="p-5">
        <p className=" font-medium md:font-2xl text-xl md:text-4xl text-center">
          Account Verification
        </p>

        <div className="mt-4 p-4">
          <FormikStepper
            initialValues={{
              // Personal
              name: "",
              dateOfBirth: formatDate(sub18Years(new Date())),
              address: "",
              email: "",
              mobileNo: "",
              // checking salaried individual or self-employed
              type: "",
              // KYC
              verificationNo: "",
              verificationPhotos: {},
            }}
            onSubmit={async (values) => {
              console.log("values", values);
            }}
          >
            {/* Personal Tab */}
            <FormikStep label="Personal Information">
              <FormikTextField
                label="Your Full Name *"
                name="name"
                type="text"
              />
              <FormikTextField
                label="Your Date of Birth *"
                name="dateOfBirth"
                type="date"
              />
              <FormikTextField
                label="You are a *"
                name="gender"
                component="select"
              >
                <option value="Default">Choose One...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </FormikTextField>
              <FormikTextField
                label="Your Address *"
                name="address"
                type="text"
              />
            </FormikStep>
            <FormikStep label="Contact Information">
              <FormikTextField label="Your Email *" name="email" type="email" />

              <FormikTextField
                label="Your Mobile No. *"
                name="mobileNo"
                type="text"
              />
            </FormikStep>
            <FormikStep label="Necessary Papers">
              <FormikTextField
                label="Your Full Name *"
                name="name"
                type="text"
              />
            </FormikStep>
            <FormikStep label="Submit Page">
              <FormikTextField
                label="Your Full Name *"
                name="name"
                type="text"
              />
            </FormikStep>
          </FormikStepper>
        </div>
      </div>
    </DashboardLayout>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [complete, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <div className="mb-4 p-4">
            <div className="flex items-center">
              {icons.map((item, index) => (
                <StepperIcons
                  key={index}
                  index={index}
                  item={item}
                  isDone={step > index}
                />
              ))}
            </div>
          </div>

          <h4 className="text-xl font-semibold my-4 mt-10">
            {childrenArray[step].props.label}
          </h4>
          {currentChild}
          <div
            className={`flex ${step > 0 ? "justify-between" : "justify-end"}`}
          >
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-blue-500 text-white rounded px-5 py-3 focus:border-none"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal text-white rounded px-8 py-3"
            >
              {isLastStep() ? "Submit" : "Next"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default verify;

{
  /* <div>
            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">
              Full Name
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full flex-1 mx-2 svelte-1l8159u">
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                  <input
                    placeholder="First Name"
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />{" "}
                </div>
              </div>
              <div className="w-full flex-1 mx-2 svelte-1l8159u">
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                  <input
                    placeholder="Last Name"
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />{" "}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mx-2 flex-1 svelte-1l8159u">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  {" "}
                  Username
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                  <input
                    placeholder="Just a hint.."
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />{" "}
                </div>
              </div>
              <div className="w-full mx-2 flex-1 svelte-1l8159u">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                  {" "}
                  Your Email
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                  <input
                    placeholder="jhon@doe.com"
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  />{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="flex p-2 mt-4">
            <button
              className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition"
            >
              Previous
            </button>
            <div className="flex-auto flex flex-row-reverse">
              <button
                className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-600  
        bg-teal-600 
        text-teal-100 
        border duration-200 ease-in-out 
        border-teal-600 transition"
              >
                Next
              </button>
              <button
                className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-200  
        bg-teal-100 
        text-teal-700 
        border duration-200 ease-in-out 
        border-teal-600 transition"
              >
                Skip
              </button>
            </div>
          </div> */
}
