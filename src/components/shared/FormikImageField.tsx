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
          setTouched({ [name]: true });
          setFieldError(name, (errors as any)[name]);
          setFieldValue(name, (e.target as any).files[0]);
          if (isEmptyObj(errors)) {
            // console.log(values);
            handleSubmit();
          }
        }}
        id={name}
        className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 ${
          (touched as any)[name] && (errors as any)[name]
            ? "border-red-600"
            : ""
        }`}
      />

      {(touched as any)[name] && (
        <div className="text-md text-red-600 italic">
          {(errors as any)[name]}
        </div>
      )}
    </div>
  );
};

export default FormikImageField;
