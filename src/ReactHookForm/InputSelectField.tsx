import { InputHTMLAttributes } from "react";
import { RefReturn, SelectOptionsTypes } from "../utils/randomTypes";

type InputSelectFieldProps = InputHTMLAttributes<HTMLSelectElement> & {
  label: string;
  component?: string;
  error: string | undefined | null;
  options: SelectOptionsTypes[];
  register: () => RefReturn;
};

const InputSelectField: React.FC<InputSelectFieldProps> = ({
  error,
  label,
  register,
  ...props
}) => {
  return (
    <div className="mt-6">
      <label className="text-md font-bold text-gray-700 tracking-wide">
        {label}
      </label>
      <select
        className="w-full text-md text-gray-500 font-semibold py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
        {...props}
        ref={register}
      >
        <option value="Default">Choose One...</option>
        <option value="lender">Lender</option>
        <option value="borrower">Borrower</option>
      </select>

      <p className="text-red pt-2 font-semibold text-sm italic">
        {error ? error : " "}
      </p>
    </div>
  );
};

export default InputSelectField;
