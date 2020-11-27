import { FormikErrors } from "formik";
import React, { useContext } from "react";
import { BorrowerTypeContext } from "../../contexts/BorrowerTypeContext";
import FormikImageField from "../shared/FormikImageField";
import FormikTextField from "../shared/FormikTextField";

export interface VerificationImages2Props {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  errors:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
}

const VerificationImages2: React.FC<VerificationImages2Props> = ({
  errors,
  setFieldValue,
}) => {
  const { borrowerType } = useContext(BorrowerTypeContext);

  return (
    <div className="mt-1">
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
        error={(errors as any).nidOrPassport}
        setFieldValue={setFieldValue}
      />

      <FormikImageField
        label="Address Proof *"
        name="addressProof"
        error={(errors as any).addressProof}
        setFieldValue={setFieldValue}
      />
      <FormikImageField
        label="Your Recent Photo *"
        name="recentPhoto"
        error={(errors as any).recentPhoto}
        setFieldValue={setFieldValue}
      />
      <FormikImageField
        label="Three Months Bank Statements *"
        name="backAccountStateMents"
        error={(errors as any).backAccountStateMents}
        setFieldValue={setFieldValue}
      />
      {borrowerType === "salaried" && (
        <div className="mt-1">
          <FormikImageField
            label="Three months Salary Slip *"
            name="salarySlip"
            error={(errors as any).salarySlip}
            setFieldValue={setFieldValue}
          />
          <FormikImageField
            label="Employee ID CARD *"
            name="employeeIdCard"
            error={(errors as any).employeeIdCard}
            setFieldValue={setFieldValue}
          />
        </div>
      )}
      {borrowerType === "self" && (
        <FormikImageField
          label="Business Proof (i.e. Trading License) *"
          name="businessProof"
          error={(errors as any).businessProof}
          setFieldValue={setFieldValue}
        />
      )}
    </div>
  );
};

export default VerificationImages2;
