import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import * as yup from "yup";
import { object } from "yup";
import { authenticatedUserData } from "../../states/userStates";
import {
  verificationFormValues,
  verificationStep,
} from "../../states/verificationStates";
import { ContactVerificationFormValues } from "../../utils/randomTypes";
import InputTextField from "../ReactHookForm/InputTextField";
import NextPreviousButton from "./NextPreviousButton";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
  const [verificationValues, setValues] = useRecoilState(
    verificationFormValues
  );
  const userData = useRecoilValue(authenticatedUserData);
  const userId = userData ? userData.userId : undefined;
  const [step, setStep] = useRecoilState(verificationStep);
  const {
    register,
    handleSubmit,
    errors,
  } = useForm<ContactVerificationFormValues>({
    resolver: yupResolver(
      object({
        address: yup.string().required("Required"),
        email: yup
          .string()
          .email("Invalid email")
          .test("Unique Email", "Email already been taken", function (value) {
            return new Promise(async (resolve, _) => {
              if (value) {
                const { data } = await axios.post(
                  "/api/unique-email-excluding-id",
                  {
                    email: value,
                    userId,
                  }
                );
                if (data.msg === "Email Taken") {
                  return resolve(false);
                }
              }
              resolve(true);
            });
          })
          .required("Required"),
        mobileNo: yup
          .number()
          .typeError("Mobile No. must be a number")
          .test(
            "len",
            "Mobile No must be 11 characters",
            (val) => val?.toString().length === 10
          )
          .required("Required"),
      })
    ),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });
  const onSubmit = async (values: ContactVerificationFormValues) => {
    // values.dateOfBirth = format(parseJSON(values.dateOfBirth), "MM/dd/yyyy");
    const { email, address, mobileNo } = values;
    // setValues({ ...verificationValues ? , email, address, mobileNo });
    setValues({ ...verificationValues!, email, address, mobileNo });
    setStep(step + 1);
  };
  return (
    <div className="pb-3 px-2 md:px-0 mt-10">
      <main className="bg-white max-w-full mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Contact Information</h3>
        </section>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <InputTextField
            defaultValue={
              verificationValues?.email
                ? verificationValues?.email
                : userData
                ? userData.email
                : ""
            }
            name="email"
            label="Your Email"
            error={errors.email?.message}
            placeholder="youremail@email.com"
            register={register}
          />
          <InputTextField
            name="address"
            defaultValue={verificationValues?.address}
            label="Your Address"
            error={errors.address?.message}
            placeholder="Enter Your Address"
            register={register}
          />
          <InputTextField
            defaultValue={verificationValues?.mobileNo}
            name="mobileNo"
            label="Your Mobile No."
            error={errors.mobileNo?.message}
            register={register}
            placeholder="i.e. 017XXXXXXXX"
          />
          <NextPreviousButton nextDisabled={errors ? false : true} />
        </form>
      </main>
    </div>
  );
};

export default Contact;
