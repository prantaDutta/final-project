import { ThreeDots } from "@agney/react-loading";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InputTextField from "../../components/ReactHookForm/InputTextField";
import ReactLoader from "../../components/ReactLoader";
import Yup from "../../lib/yup";
import { newLoanFormValues } from "../../states/newLoanState";
import { isProduction, NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import {
  calculateMonthlyInstallment,
  formatTwoDecimalPlaces,
  redirectToLogin,
} from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";

interface newLoanProps {
  user: ModifiedUserData;
}

export interface NewLoanFormValues {
  amount: number;
  interestRate: number;
  loanDuration: number;
  monthlyInstallment: number;
}

const newLoan: React.FC<newLoanProps> = ({ user }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [newFormState, setFormState] = useRecoilState(newLoanFormValues);
  const { register, handleSubmit, errors, watch } = useForm<NewLoanFormValues>({
    resolver: yupResolver(
      Yup.object({
        amount: Yup.number()
          .typeError("Amount must be a number")
          .min(999.99, "Minimum Loan Amount is 1000tk")
          .required("Required"),
        interestRate: Yup.number()
          .typeError("Amount must be a number")
          .min(4, "Minimum Interest Rate is 4%")
          .max(15, "Maximum Interest Rate is 15%")
          .required("Required"),
        loanDuration: Yup.number()
          .typeError("Loan Duration must be a number")
          .min(1, "Minimum Loan Duration is 4%")
          .max(18, "Maximum Loan Duration is 15%")
          .required("Required"),
        monthlyInstallment: Yup.number()
          .typeError("Loan Duration must be a number")
          .test(
            "checking monthly installment",
            "Something is Wrong",
            (value) =>
              value == modifiedMonthlyInstallment ||
              value == newFormState?.monthlyInstallment
          )
          .required("Required"),
      })
    ),
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const submitHandler = (values: NewLoanFormValues) => {
    // setFormValues(values);
    let modifiedInstallment = formatTwoDecimalPlaces(
      calculateMonthlyInstallment(amount, +interestRate + 2, loanDuration)
    );
    setFormState({
      ...values,
      modifiedMonthlyInstallment: +modifiedInstallment,
    });
    setComplete(true);
  };

  let modifiedMonthlyInstallment = 0;
  let amount = watch("amount");
  let interestRate = watch("interestRate");
  let loanDuration = watch("loanDuration");

  if (amount && loanDuration) {
    modifiedMonthlyInstallment = formatTwoDecimalPlaces(
      calculateMonthlyInstallment(amount, interestRate, loanDuration)
    );
  }
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Apply For A New Loan</h1>
      </div>

      {complete ? (
        <div className="px-4">
          <p className="text-2xl font-bold pl-5 mt-8">
            Thank You for Submitting.
          </p>
          <div className="p-5">
            <p className="text-xl font-bold mt-5">
              Loan Amount: {newFormState?.amount} Tk.
            </p>
            <p className="text-xl font-bold mt-5">
              Interest Rate: {newFormState?.interestRate}%
            </p>
            <p className="text-xl font-bold mt-5">
              Loan Duration: {newFormState?.loanDuration} Months
            </p>
            <p className="text-xl font-bold mt-5">
              Company Fees (2%){": "}
              {newFormState?.amount! * (newFormState?.interestRate! / 100)} Tk
            </p>

            <p className="text-xl font-bold mt-5">
              Monthly Installment With Fees:{" "}
              {formatTwoDecimalPlaces(
                calculateMonthlyInstallment(
                  +newFormState?.amount!,
                  +newFormState?.interestRate! + 2,
                  +newFormState?.loanDuration!
                )
              )}{" "}
              Tk.
            </p>
            <div className="mt-5">
              <button
                onClick={() => setComplete(false)}
                className="bg-primary text-white p-3 mr-3 w-1/4 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
              >
                Take Me Back
              </button>
              <button
                onClick={async () => {
                  // console.log(newFormState);
                  setSubmitting(true);
                  const data = await axios.post("/api/user/new-loan", {
                    values: newFormState,
                    userId: user.userId,
                  });
                  if (!isProduction) console.log("data :>> ", data);
                  if (data) setFormState(null);
                  router.push("/current-loans");
                }}
                className="bg-primary text-white p-3 w-1/4 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
              >
                {submitting ? (
                  <ReactLoader component={<ThreeDots width="50" />} />
                ) : (
                  "Proceed"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <main className="bg-white w-full mx-auto p-4 md:p-8 mt-5 rounded-lg shadow-2xl">
          <p className="pt-2 pl-8 text-xl font-semibold">
            Enter the following Data
          </p>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex px-4">
              <InputTextField
                name="amount"
                label="Your Loan Amount (1000-50000tk)"
                defaultValue={newFormState ? newFormState.amount : undefined}
                error={errors.amount?.message}
                placeholder="Enter Amount (Min. 1000)"
                register={register}
              />

              <InputTextField
                name="interestRate"
                defaultValue={
                  newFormState ? newFormState.interestRate : undefined
                }
                label="Your Desired Interest Rate (in %)"
                error={errors.interestRate?.message}
                placeholder="Enter A Number from 4 to 15"
                register={register}
              />
            </div>
            <div className="flex px-4">
              <InputTextField
                name="loanDuration"
                label="Loan Duration (In Months)"
                defaultValue={
                  newFormState ? newFormState.loanDuration : undefined
                }
                error={errors.loanDuration?.message}
                placeholder="Enter A Number from 1 to 18"
                register={register}
              />

              <InputTextField
                name="monthlyInstallment"
                label="Monthly Installment Rate"
                error={errors.monthlyInstallment?.message}
                register={register}
                value={
                  modifiedMonthlyInstallment
                    ? modifiedMonthlyInstallment
                    : newFormState?.monthlyInstallment || ""
                }
                placeholder="This Field is Uneditable"
                readOnly
              />
            </div>

            <button
              type="submit"
              className="mt-5 bg-primary text-gray-100 p-3 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                                shadow-lg transition-css"
            >
              Submit
            </button>
          </form>
        </main>
      )}
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

export default newLoan;
