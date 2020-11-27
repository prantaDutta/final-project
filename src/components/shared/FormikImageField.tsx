import { FormikErrors } from "formik";
import { InputHTMLAttributes, useState } from "react";

type FormikImageFieldProps = InputHTMLAttributes<HTMLElement> & {
  label: string;
  name: string;
  component?: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  error:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
};

const FormikImageField: React.FC<FormikImageFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const { error, name, /*touched */ setFieldValue /* setTouched */ } = props;
  const [touched, setTouched] = useState(false);

  return (
    <div className="mb-6 pt-3 rounded bg-gray-200">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 ml-3"
        htmlFor={name}
      >
        {label}
      </label>

      <input
        name={name}
        type="file"
        onChange={(e) => {
          setTouched(true);
          setFieldValue(name, (e.target as any).files[0]);
        }}
        id={name}
        className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 ${
          touched && error ? "border-red-600" : ""
        }`}
      />

      {touched && <div className="text-md text-red-600 italic">{error}</div>}
    </div>
  );
};

export default FormikImageField;
