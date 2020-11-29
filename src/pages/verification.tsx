import React, { useContext } from "react";
import FormikTextField from "../components/shared/FormikTextField";
import DashboardLayout from "../components/layouts/DashboardLayout";
import axios from "axios";
import { formatDate, eightennYearsBackFromNow } from "../utils/functions";
import { object } from "yup";
import * as Yup from "yup";
import {
  FormikStepper,
  FormikStepProps,
} from "../components/shared/FormikStepper";
import { AuthContext } from "../contexts/AuthContext";
import { users } from "@prisma/client";
// import { BorrowerTypeContext } from "../contexts/BorrowerTypeContext";
// import { useFormikContext } from "formik";
// import CustomImageComponent from "../components/verification/VerificationImages";
import FormikImageField from "../components/shared/FormikImageField";
import { imageValidation } from "../utils/vaidationSchema";
import { useFormikContext } from "formik";
import { BorrowerTypeContext } from "../contexts/BorrowerTypeContext";

// const FILE_SIZE = 1024 * 1024;
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

interface verifyProps {}

const verify: React.FC<verifyProps> = ({}) => {
  const { user } = useContext(AuthContext);
  const { id, name, gender, dateOfBirth, email } = user as users;
  const { borrowerType } = useContext(BorrowerTypeContext);

  if (borrowerType === "salaried") {
    console.log("salaried");
    const salariedImageValidation = {
      ...imageValidation,
    };
  }

  const formattedDate = dateOfBirth
    ? dateOfBirth.toString().split("T")[0]
    : formatDate(new Date());

  return (
    <DashboardLayout>
      <div className="p-5">
        <p className=" font-medium md:font-2xl text-xl md:text-4xl text-center">
          Account Verification
        </p>
        {}

        <div className="mt-4 p-4">
          <FormikStepper
            enableReinitialize
            initialValues={{
              // Personal
              name: name || "",
              dateOfBirth: formattedDate,
              gender: gender || "",
              // contact information
              address: "RKM, Chattagram, Bangladesh",
              email: email || "",
              mobileNo: "01851944587",
              // checking salaried individual or self-employed
              type: "",
              // KYC
              documentType: "nid",
              // verificationphotos
              nidOrPassport: "",
              addressProof: "",
              recentPhoto: "",
              backAccountStateMents: "",
              businessProof: "",
              salarySlip: "",
              employeeIdCard: "",
            }}
            onSubmit={async (values) => {
              console.log("values", values);
            }}
          >
            {/* Personal Tab */}
            <FormikStep
              label="Personal Information"
              validationSchema={object({
                name: Yup.string().required("Required"),
                gender: Yup.mixed()
                  .oneOf(["male", "female"], "Gender should be Male or Female")
                  .required("Required"),
                dateOfBirth: Yup.date()
                  .max(
                    formatDate(eightennYearsBackFromNow()).toString(),
                    "You Must be 18 Years Old"
                  )
                  .required("Required"),
              })}
            >
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
            </FormikStep>
            {/* contact Information */}
            <FormikStep
              label="Contact Information"
              validationSchema={object({
                address: Yup.string().required("Required"),
                email: Yup.string()
                  .email("Invalid email")
                  .test(
                    "Unique Email",
                    "Email already been taken",
                    function (value) {
                      return new Promise((resolve, _) => {
                        axios
                          .post("/api/unique-email-excluding-id", {
                            email: value,
                            id,
                          })
                          .then((res) => {
                            if (res.data.msg === "Email already been taken") {
                              resolve(false);
                            }
                            resolve(true);
                          });
                      });
                    }
                  )
                  .required("Required"),
                mobileNo: Yup.number()
                  .typeError("age must be a number")
                  .test(
                    "len",
                    "Mobile No must be 11 characters",
                    (val) => val?.toString().length === 10
                  )
                  .required("Required"),
              })}
            >
              <FormikTextField
                label="Your Address *"
                name="address"
                type="text"
              />
              <FormikTextField label="Your Email *" name="email" type="email" />

              <FormikTextField
                label="Your Mobile No. *"
                name="mobileNo"
                type="text"
              />
            </FormikStep>
            {/* Necessary Papers */}
            <FormikStep
              validationSchema={object({
                type: Yup.mixed()
                  .oneOf(["salaried", "self"], "You have to select a type")
                  .required("Required"),
              })}
              label="Necessary Papers"
            >
              <FormikTextField
                label="Select Borrower Type *"
                name="type"
                component="select"
              >
                <option value="Default">Choose One...</option>
                <option value="salaried">Salaried Individual</option>
                <option value="self">Self Employed</option>
              </FormikTextField>
            </FormikStep>
            {/*Submit Page */}

            <FormikStep
              validationSchema={object({
                nidOrPassport: imageValidation,
                addressProof: imageValidation,
                recentPhoto: imageValidation,
                backAccountStateMents: imageValidation,
                // businessProof: Yup.string().when("borrowerType", {
                //   is: "self",
                //   then: imageValidation,
                // }),
                // salarySlip: Yup.string().when(Yup.ref("type"), {
                //   is: "salaried",
                //   then: imageValidation,
                // }),
                // employeeIdCard: Yup.string().when("borrowerType", {
                //   is: "salaried",
                //   then: imageValidation,
                // }),
                businessProof: Yup.lazy(() => {
                  if (borrowerType === "self") {
                    return imageValidation;
                  } else {
                    return Yup.mixed().notRequired();
                  }
                }),
                salarySlip: Yup.lazy(() => {
                  if (borrowerType === "salaried") {
                    return imageValidation;
                  } else {
                    return Yup.mixed().notRequired();
                  }
                }),
                employeeIdCard: Yup.lazy(() => {
                  if (borrowerType === "salaried") {
                    return imageValidation;
                  } else {
                    return Yup.mixed().notRequired();
                  }
                }),
                // businessProof: imageValidation,
                // salarySlip: imageValidation,
                // employeeIdCard: imageValidation,
              })}
              label="Submit Page"
            >
              <FormikTextField
                label="Verification Document *"
                name="documentType"
                component="select"
              >
                <option value="nid">NID</option>
                <option value="passportNo">Passport</option>
              </FormikTextField>
              <FormikImageField
                label="Photo of NID/ Passport"
                name="nidOrPassport"
                // error={errors.nidOrPassport}
                // setFieldValue={setFieldValue}
              />
              <FormikImageField
                label="Address Proof *"
                name="addressProof"
                // error={errors.addressProof}
                // setFieldValue={setFieldValue}
              />
              <FormikImageField
                label="Your Recent Photo *"
                name="recentPhoto"
                // error={errors.recentPhoto}
                // setFieldValue={setFieldValue}
              />
              <FormikImageField
                label="Three Months Bank Statements *"
                name="backAccountStateMents"
                // error={errors.backAccountStateMents}
                // setFieldValue={setFieldValue}
              />
              {borrowerType === "salaried" && (
                <>
                  <FormikImageField
                    label="Three months Salary Slip *"
                    name="salarySlip"
                    // error={errors.salarySlip}
                    // setFieldValue={setFieldValue}
                  />
                  <FormikImageField
                    label="Employee ID CARD *"
                    name="employeeIdCard"
                    // error={errors.employeeIdCard}
                    // setFieldValue={setFieldValue}
                  />
                </>
              )}
              {borrowerType === "self" && (
                <FormikImageField
                  label="Business Proof (i.e. Trading License) *"
                  name="businessProof"
                  // error={errors.businessProof}
                  // setFieldValue={setFieldValue}
                />
              )}
            </FormikStep>
          </FormikStepper>
        </div>
      </div>
    </DashboardLayout>
  );
};

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export default verify;

{
  /* <FormikTextField
                label="Your NID / Passport *"
                name="nidOrPassport"
                type="file"
              /> */
}
{
  /*
              <FormikTextField
                label="Address Proof *"
                name="addressProof"
                type="file"
              />

              <FormikTextField
                label="Your Recent Photo *"
                name="recentPhoto"
                type="file"
              />

              <FormikTextField
                label="Three Months Bank Statements *"
                name="backAccountStateMents"
                type="file"
              />

              {borrowerType === "salaried" && (
                <>
                  <FormikTextField
                    label="Three months Salary Slip *"
                    name="salarySlip"
                    type="file"
                  />
                  <FormikTextField
                    label="Employee ID CARD *"
                    name="employeeIdCard"
                    type="file"
                  />
                </>
              )}

              {borrowerType === "self" && (
                <FormikTextField
                  multiple
                  label="Business Proof (i.e. Trading License) *"
                  name="businessProof"
                  type="file"
                />
              )} */
}
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
