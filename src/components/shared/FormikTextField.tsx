import { ErrorMessage, Field, FieldProps, useField } from "formik";
import { InputHTMLAttributes } from "react";

type FormikTextFieldProps = InputHTMLAttributes<HTMLElement> & {
  label: string;
  name: string;
  component?: string;
};

const FormikTextField: React.FC<FormikTextFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error, touched }] = useField<FieldProps>(props);

  return (
    <div className="mt-6">
      <label
        className="text-md font-bold text-gray-700 tracking-wide"
        htmlFor={field.name}
      >
        {label}
      </label>
      <Field
        {...field}
        {...props}
        id={field.name}
        className={`w-full text-md text-gray-500 font-semibold py-2 border-b focus:outline-none ${
          touched && error
            ? "border-red-600 focus:border-red-600"
            : "border-gray-300 focus:border-indigo-500"
        }`}
      />
      {touched && (
        <ErrorMessage name={field.name}>
          {() => (
            <div className="text-red pt-2 font-semibold text-sm italic">
              {error}
            </div>
          )}
        </ErrorMessage>
      )}
    </div>
  );
};

export default FormikTextField;
