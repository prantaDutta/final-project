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
