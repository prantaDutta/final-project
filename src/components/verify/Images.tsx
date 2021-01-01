import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { object } from "yup";
import yup from "../../lib/yup";
import {
  verificationFormValues,
  verificationStep,
} from "../../states/verificationStates";
import { BASE_URL, isProduction } from "../../utils/constants";
import {
  appendingFieldsToFormData,
  appendingFileToFormData,
} from "../../utils/functions";
import { ImagesVerificationFormValues } from "../../utils/randomTypes";
import {
  multipleImageValidation,
  singleImageValidation,
} from "../../utils/vaidationSchema";
import InputFileField from "../ReactHookForm/InputFileField";
import NextPreviousButton from "./NextPreviousButton";

interface ImagesProps {}

const Images: React.FC<ImagesProps> = ({}) => {
  const router = useRouter();
  const [complete, setComplete] = useState<boolean>(false);
  const [, setStep] = useRecoilState(verificationStep);
  const [verificationValues, setValues] = useRecoilState(
    verificationFormValues
  );
  const {
    control,
    handleSubmit,
    errors,
  } = useForm<ImagesVerificationFormValues>({
    resolver: yupResolver(
      object({
        nidOrPassport: singleImageValidation,
        addressProof: singleImageValidation,
        recentPhoto: singleImageValidation,
        bankAccountStateMents: multipleImageValidation,
        businessProof: yup.lazy(() => {
          if (verificationValues?.borrowerType === "self") {
            return singleImageValidation;
          } else {
            return yup.mixed().notRequired();
          }
        }),
        salarySlip: yup.lazy(() => {
          if (verificationValues?.borrowerType === "salaried") {
            return singleImageValidation;
          } else {
            return yup.mixed().notRequired();
          }
        }),
        employeeIdCard: yup.lazy(() => {
          if (verificationValues?.borrowerType === "salaried") {
            return singleImageValidation;
          } else {
            return yup.mixed().notRequired();
          }
        }),
      })
    ),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const formData = new FormData();
  // sending data to the api

  // the updated value is available on the next render in recoil state
  // That's why we have to use useEffect
  useEffect(() => {}, [complete]);

  const onSubmit = async (values: ImagesVerificationFormValues) => {
    let {
      nidOrPassport,
      addressProof,
      recentPhoto,
      bankAccountStateMents,
      businessProof,
      salarySlip,
      employeeIdCard,
    } = values;

    // nidOrPassport = filesToObject(nidOrPassport as [File]);
    appendingFileToFormData("nidOrPassport", nidOrPassport, formData);
    appendingFileToFormData("addressProof", addressProof, formData);
    appendingFileToFormData("recentPhoto", recentPhoto, formData);
    appendingFileToFormData(
      "bankAccountStateMents",
      bankAccountStateMents,
      formData
    );
    verificationValues?.borrowerType === "self" &&
      appendingFileToFormData("businessProof", businessProof, formData);
    verificationValues?.borrowerType === "salaried" &&
      appendingFileToFormData("salarySlip", salarySlip, formData);
    verificationValues?.borrowerType === "salaried" &&
      appendingFileToFormData("employeeIdCard", employeeIdCard, formData);

    for (const [key, value] of Object.entries(verificationValues!)) {
      appendingFieldsToFormData(key, value, formData);
    }
    setValues({
      ...verificationValues!,
      nidOrPassport,
      addressProof,
      recentPhoto,
      bankAccountStateMents,
      businessProof,
      salarySlip,
      employeeIdCard,
    });
    setComplete(true);

    try {
      const response = await axios(`${BASE_URL}/api/verify`, {
        method: "PUT",
        data: formData,
        withCredentials: true,
      });
      if (!isProduction) console.log("Response: ", response);
      setStep(0);
      router.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };
  // console.log("verificationValues: ", verificationValues);
  return (
    <div className="pb-3 px-2 md:px-0 mt-10">
      <main className="bg-white max-w-full mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Verification Photos</h3>
        </section>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <InputFileField
            name="nidOrPassport"
            label="Your Nid/Passport"
            error={(errors.nidOrPassport as any)?.message}
            control={control}
          />
          <InputFileField
            name="addressProof"
            label="Address Proof"
            error={(errors.addressProof as any)?.message}
            control={control}
          />
          <InputFileField
            name="recentPhoto"
            label="Recent Photo"
            error={(errors.recentPhoto as any)?.message}
            control={control}
          />
          <InputFileField
            name="bankAccountStateMents"
            multiple={true}
            label="Bank AccountStateMents (Atleast 3 Months)"
            error={(errors.bankAccountStateMents as any)?.message}
            control={control}
          />
          {verificationValues?.borrowerType === "self" && (
            <InputFileField
              name="businessProof"
              label="Business Proof (i.e. Trading License)"
              error={(errors.businessProof as any)?.message}
              control={control}
            />
          )}
          {verificationValues?.borrowerType === "salaried" && (
            <>
              <InputFileField
                name="salarySlip"
                label="Salary Slip"
                error={(errors.salarySlip as any)?.message}
                control={control}
              />
              <InputFileField
                name="employeeIdCard"
                label="Employee Id Card"
                error={(errors.employeeIdCard as any)?.message}
                control={control}
              />{" "}
            </>
          )}
          <NextPreviousButton nextDisabled={errors ? false : true} />
        </form>
      </main>
    </div>
  );
};

export default Images;
