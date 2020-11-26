import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { useState } from "react";
import StepperIcons, { icons } from "../verification/StepperIcons";

export interface FormikStepProps
  extends Pick<
    FormikConfig<FormikValues>,
    "children" | "validationSchema" /*| "initialValues"*/
  > {
  label: string;
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
      // initialValues={currentChild.props.initialValues}
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
