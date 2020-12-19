export type ModifiedUserData = {
  id: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  email: string;
};

export interface linkArray {
  href: string;
  label: string;
  svgD?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;
