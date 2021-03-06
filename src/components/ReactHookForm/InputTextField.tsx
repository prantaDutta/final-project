import { InputHTMLAttributes } from "react";
import { RefReturn } from "../../utils/randomTypes";

type InputTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  component?: string;
  error?: string | undefined | null;
  register?: () => RefReturn;
};

const InputTextField: React.FC<InputTextFieldProps> = ({
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
      <input
        className={`w-full text-md text-gray-500 font-semibold py-2 border-b focus:outline-none ${
          error
            ? "border-red-600 focus:border-red-600"
            : "border-gray-300 focus:border-indigo-500"
        }`}
        {...props}
        ref={register}
      />

      <p className="text-red pt-2 font-semibold text-sm italic">
        {error ? error : " "}
      </p>
    </div>
  );
};

export default InputTextField;
