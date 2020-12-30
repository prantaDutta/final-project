export type ModifiedUserData = {
  id: number;
  name: string;
  // gender: string;
  // dateOfBirth: string;
  email: string;
};

export interface linkArray {
  href: string;
  label: string;
  svgD?: string;
}
// this is the type defintion for react hook form ref
export type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  // gender: string;
  // dateOfBirth: string;
}

export type SelectOptionsTypes = {
  value: string;
  title: string;
};

export type VerificationFormValues = {
  // Personal
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  // contact information
  address: string;
  email: string;
  mobileNo: string;
  // checking salaried individual or self-employed
  borrowerType: string;
  // verificationphotos
  nidOrPassport: {};
  addressProof: {};
  recentPhoto: {};
  bankAccountStateMents: {};
  businessProof: {};
  salarySlip: {};
  employeeIdCard: {};
};

// Verification Types
export type PersonalVerificationFormValues = {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
};

export type ContactVerificationFormValues = {
  address: string;
  email: string;
  mobileNo: string;
};

export type PapersVerificationFormValues = {
  borrowerType: string;
};

export type ImagesVerificationFormValues = {
  nidOrPassport: Array<[File]>;
  addressProof: Array<[File]>;
  recentPhoto: Array<[File]>;
  bankAccountStateMents: Array<[File]>;
  businessProof: Array<[File]>;
  salarySlip: Array<[File]>;
  employeeIdCard: Array<[File]>;
};
