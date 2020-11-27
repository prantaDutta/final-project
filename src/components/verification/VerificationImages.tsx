// import { Formik, useFormikContext } from "formik";
// import React, { useContext } from "react";
// import { object } from "yup";
// import * as Yup from "yup";
// import { BorrowerTypeContext } from "../../contexts/BorrowerTypeContext";
// import FormikImageField from "../shared/FormikImageField";

// // const FILE_SIZE = 1024 * 1024;
// // const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

// interface VerificationImagesProps {}

// // const imageValidation = Yup.mixed()
// //   .required("A file is required")
// //   .test("fileSize", "File is too large", (value) => {
// //     // console.log("value: ", value);
// //     return value && value.size <= FILE_SIZE;
// //   })
// //   .test(
// //     "fileFormat",
// //     "Unsupported Format",
// //     (value) => value && SUPPORTED_FORMATS.includes(value.type)
// //   );

// const VerificationImages: React.FC<VerificationImagesProps> = ({}) => {
//   const { borrowerType } = useContext(BorrowerTypeContext);
//   // const  { values, submitForm } = useFormikContext();
//   // const [isSuccess, ]
//   // React.useEffect(() => {
//   //   // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
//   //   if (values) {
//   //     submitForm();
//   //   }
//   // }, [values, submitForm]);
//   // return null;
// };
//   return (
//     <Formik
//       initialValues={{
//         nidOrPassport: "",
//         addressProof: "",
//         recentPhoto: "",
//         backAccountStateMents: "",
//         businessProof: "",
//         salarySlip: "",
//         employeeIdCard: "",
//       }}
//       onSubmit={async (values) => {
//         console.log(values);
//       }}
//       validationSchema={object().shape({
//         nidOrPassport: imageValidation,
//         addressProof: imageValidation,
//         recentPhoto: imageValidation,
//         backAccountStateMents: imageValidation,
//         businessProof: imageValidation,
//         salarySlip: imageValidation,
//         employeeIdCard: imageValidation,
//       })}
//     >
//       {({ setFieldValue, errors }) => {
//         return (
//           <div className="mt-1">
//             <FormikImageField
//               label="Photo of NID/ Passport"
//               name="nidOrPassport"
//               error={errors.nidOrPassport}
//               setFieldValue={setFieldValue}
//             />

//             <FormikImageField
//               label="Address Proof *"
//               name="addressProof"
//               error={errors.addressProof}
//               setFieldValue={setFieldValue}
//             />
//             <FormikImageField
//               label="Your Recent Photo *"
//               name="recentPhoto"
//               error={errors.recentPhoto}
//               setFieldValue={setFieldValue}
//             />
//             <FormikImageField
//               label="Three Months Bank Statements *"
//               name="backAccountStateMents"
//               error={errors.backAccountStateMents}
//               setFieldValue={setFieldValue}
//             />
//             {borrowerType === "salaried" && (
//               <>
//                 <FormikImageField
//                   label="Three months Salary Slip *"
//                   name="salarySlip"
//                   error={errors.salarySlip}
//                   setFieldValue={setFieldValue}
//                 />
//                 <FormikImageField
//                   label="Employee ID CARD *"
//                   name="employeeIdCard"
//                   error={errors.employeeIdCard}
//                   setFieldValue={setFieldValue}
//                 />
//               </>
//             )}
//             {borrowerType === "self" && (
//               <FormikImageField
//                 label="Business Proof (i.e. Trading License) *"
//                 name="businessProof"
//                 error={errors.businessProof}
//                 setFieldValue={setFieldValue}
//               />
//             )}
//           </div>
//         );
//       }}
//     </Formik>
//   );
// };

// export default VerificationImages;
import { Formik, useFormikContext } from "formik";
import React, { useContext, useState } from "react";
import { object } from "yup";
import { BorrowerTypeContext } from "../../contexts/BorrowerTypeContext";
import FormikImageField from "../shared/FormikImageField";
import { imageValidation } from "../../utils/vaidationSchema";

interface VerificationImagesProps {}

const VerificationImages: React.FC<VerificationImagesProps> = ({}) => {
  const { borrowerType } = useContext(BorrowerTypeContext);
  // const [isValid, setIsValid] = useState(false);
  const { values, submitForm, isValid } = useFormikContext();
  React.useEffect(() => {
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    if (isValid) {
      submitForm();
    }
  }, [values, submitForm]);

  return (
    <Formik
      initialValues={{
        nidOrPassport: "",
        addressProof: "",
        recentPhoto: "",
        backAccountStateMents: "",
        businessProof: "",
        salarySlip: "",
        employeeIdCard: "",
      }}
      onSubmit={async (values) => {
        console.log(values);
      }}
      validationSchema={object().shape({
        nidOrPassport: imageValidation,
        addressProof: imageValidation,
        recentPhoto: imageValidation,
        backAccountStateMents: imageValidation,
        businessProof: imageValidation,
        salarySlip: imageValidation,
        employeeIdCard: imageValidation,
      })}
    >
      {async ({ setFieldValue, errors }) => (
        <div className="mt-1">
          {/* {console.log(values)} */}
          <FormikImageField
            label="Photo of NID/ Passport"
            name="nidOrPassport"
            error={errors.nidOrPassport}
            setFieldValue={setFieldValue}
          />

          <FormikImageField
            label="Address Proof *"
            name="addressProof"
            error={errors.addressProof}
            setFieldValue={setFieldValue}
          />
          <FormikImageField
            label="Your Recent Photo *"
            name="recentPhoto"
            error={errors.recentPhoto}
            setFieldValue={setFieldValue}
          />
          <FormikImageField
            label="Three Months Bank Statements *"
            name="backAccountStateMents"
            error={errors.backAccountStateMents}
            setFieldValue={setFieldValue}
          />
          {borrowerType === "salaried" && (
            <>
              <FormikImageField
                label="Three months Salary Slip *"
                name="salarySlip"
                error={errors.salarySlip}
                setFieldValue={setFieldValue}
              />
              <FormikImageField
                label="Employee ID CARD *"
                name="employeeIdCard"
                error={errors.employeeIdCard}
                setFieldValue={setFieldValue}
              />
            </>
          )}
          {borrowerType === "self" && (
            <FormikImageField
              label="Business Proof (i.e. Trading License) *"
              name="businessProof"
              error={errors.businessProof}
              setFieldValue={setFieldValue}
            />
          )}
        </div>
      )}
    </Formik>
  );
};

export default VerificationImages;
