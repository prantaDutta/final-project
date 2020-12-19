import { InputHTMLAttributes } from "react";
import { RefReturn } from "../utils/randomTypes";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  component?: string;
  error: string | undefined | null;
  register: () => RefReturn;
};

const InputField: React.FC<InputFieldProps> = ({
  error,
  label,
  register,
  ...props
}) => {
  return (
    <div>
      <div className="text-md font-bold text-gray-700 tracking-wide">
        {label}
      </div>
      <input
        className="w-full text-md text-gray-500 font-semibold py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
        {...props}
        ref={register}
      />

      <p className="text-red pt-2 font-semibold text-sm italic">
        {error ? error : " "}
      </p>
    </div>
  );
};

export default InputField;
