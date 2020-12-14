import React, { useContext, useEffect, useState } from "react";
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
import FormikImageField from "../components/shared/FormikImageField";
import { imageValidation } from "../utils/vaidationSchema";
import { BorrowerTypeContext } from "../contexts/BorrowerTypeContext";
import { useRouter } from "next/router";
import ReactLoader from "../components/ReactLoader";
import { BallTriangle } from "@agney/react-loading";

const verify = ({}) => {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState<undefined | {}>({});
  const router = useRouter();

  useEffect(() => {
    const func = async () => {
      if (userId) {
        try {
          const { data } = await axios.post(`/api/fetch-user-by-id`, {
            id: userId,
          });
          setUserData(data);
          console.log("userData: ", userData);
        } catch (e) {
          console.log("You messed up: ", e);
        }
      }
    };
    func();
  }, [userId]);

  // if (!userData) {
  //   return router.push("/login");
  // }

  if (!userData) {
    return <ReactLoader component={<BallTriangle width="50" />} />;
  }
  const { id, name, gender, dateOfBirth, email } = userData as any;
  // console.log(userData);
  const { borrowerType } = useContext(BorrowerTypeContext);

  const formattedDate = dateOfBirth
    ? dateOfBirth /*.toString().split("T")[0] */
    : formatDate(new Date());
  // console.log(data);
  return (
    // <p>hello</p>
    <DashboardLayout>
      <div className="p-5">
        <p className=" font-medium md:font-2xl text-xl md:text-4xl text-center">
          Account Verification
        </p>

        <div className="mt-4 p-4">
          <FormikStepper
            enableReinitialize
            initialValues={{
              // Personal
              id,
              name: name || "",
              dateOfBirth: formattedDate,
              gender: gender || "",
              // contact information
              address: "",
              email: email || "",
              mobileNo: "",
              // checking salaried individual or self-employed
              borrowerType: "",
              // KYC
              documentType: "nid",
              // verificationphotos
              nidOrPassport: "",
              addressProof: "",
              recentPhoto: "",
              bankAccountStateMents: "",
              businessProof: "",
              salarySlip: "",
              employeeIdCard: "",
            }}
            onSubmit={async (values) => {
              // console.log("values", values);
              const formData = new FormData();
              for (let [key, value] of Object.entries(values))
                formData.append(key, value);

              /* sending the image as FormData to the api to store locally */
              try {
                const res = await axios("api/verification", {
                  data: formData,
                  method: "POST",
                  headers: { "content-type": "multipart/form-data" },
                });
                console.log(res);
                router.push("/dashboard");
              } catch (e) {
                throw new Error(`You Messed Up ${e}`);
              }
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
                borrowerType: Yup.mixed()
                  .oneOf(["salaried", "self"], "You have to select a type")
                  .required("Required"),
              })}
              label="Necessary Papers"
            >
              <FormikTextField
                label="Select Borrower Type *"
                name="borrowerType"
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
                bankAccountStateMents: imageValidation,
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
              />
              <FormikImageField label="Address Proof *" name="addressProof" />
              <FormikImageField
                label="Your Recent Photo *"
                name="recentPhoto"
              />
              <FormikImageField
                label="Three Months Bank Statements *"
                name="bankAccountStateMents"
              />
              {borrowerType === "salaried" && (
                <>
                  <FormikImageField
                    label="Three months Salary Slip *"
                    name="salarySlip"
                  />
                  <FormikImageField
                    label="Employee ID CARD *"
                    name="employeeIdCard"
                  />
                </>
              )}
              {borrowerType === "self" && (
                <FormikImageField
                  label="Business Proof (i.e. Trading License) *"
                  name="businessProof"
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
