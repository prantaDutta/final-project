import { useFormikContext } from "formik";
import { InputHTMLAttributes } from "react";
import { isEmptyObj } from "../../utils/functions";

type FormikImageFieldProps = InputHTMLAttributes<HTMLElement> & {
  label: string;
  name: string;
  component?: string;
};

const FormikImageField: React.FC<FormikImageFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const { name } = props;
  const {
    setFieldValue,
    setFieldError,
    touched,
    setTouched,
    handleSubmit,
    errors,
  } = useFormikContext();

  return (
    <div className="mt-6">
      <label className="text-md font-bold text-gray-700 tracking-wide">
        {label}
      </label>

      <input
        name={name}
        type="file"
        onChange={(e) => {
          setTouched({ [name]: true });
          setFieldError(name, (errors as any)[name]);
          setFieldValue(name, (e.target as any).files[0]);
          if (isEmptyObj(errors)) {
            handleSubmit();
          }
        }}
        id={name}
        className={`w-full text-md text-gray-500 font-semibold py-2 border-b focus:outline-none ${
          (touched as any)[name] && (errors as any)[name]
            ? "border-red-600 focus:border-red-600"
            : "border-gray-300 focus:border-indigo-500"
        }`}
      />

      {(touched as any)[name] && (
        <div className="text-red pt-2 font-semibold text-sm italic">
          {(errors as any)[name]}
        </div>
      )}
    </div>
  );
};

export default FormikImageField;
