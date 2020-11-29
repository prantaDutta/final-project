// import {
//   Field,
//   ErrorMessage,
//   useField,
//   FieldProps,
//   useFormikContext,
//   FormikValues,
// } from "formik";
// import { InputHTMLAttributes } from "react";

// type FormikImageFieldProps = InputHTMLAttributes<HTMLElement> & {
//   label: string;
//   name: string;
//   component?: string;
//   // setFieldValue: (
//   //   field: string,
//   //   value: any,
//   //   shouldValidate?: boolean | undefined
//   // ) => void;
//   // error: string | undefined;
// };

// const FormikImageField: React.FC<FormikImageFieldProps> = ({
//   label,
//   size: _,
//   ...props
// }) => {
//   // const [field, { error, touched, value }, helper] = useField<FieldProps>(
//   //   props
//   // );

//   const { name } = props;

//   const { setFieldValue, values, handleChange } = useFormikContext();
//   console.log(values);
//   console.log(name);

//   return (
//     <div className="mb-6 pt-3 rounded bg-gray-200">
//       <label
//         className="block text-gray-700 text-sm font-bold mb-2 ml-3"
//         htmlFor={name}
//       >
//         {label}
//       </label>
//       <input
//         type="file"
//         onChange={(e: any) => {
//           // setTouched(true);
//           setFieldValue(name, (e.target as any).files[0]);
//         }}
//         id={field.name}
//         className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 ${
//           touched && error ? "border-red-600" : ""
//         }`}
//       />
//       {touched && (
//         <ErrorMessage name={field.name}>
//           {() => <div className="text-md text-red-600 italic">{error}</div>}
//         </ErrorMessage>
//       )}
//     </div>
//   );
// };

// export default FormikImageField;

import { FormikValues, useFormikContext } from "formik";
import { InputHTMLAttributes } from "react";
import { isEmptyObj } from "../../utils/functions";

type FormikImageFieldProps = InputHTMLAttributes<HTMLElement> & {
  label: string;
  name: string;
  component?: string;
  // setFieldValue: (
  //   field: string,
  //   value: any,
  //   shouldValidate?: boolean | undefined
  // ) => void;
  // error: string | undefined;
};

const FormikImageField: React.FC<FormikImageFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const { name /*touched */ /* setTouched */ } = props;
  const {
    setFieldValue,
    setFieldError,
    touched,
    setTouched,
    handleSubmit,
    errors,
    setErrors,
    values,
  } = useFormikContext();

  // const [touched, setTouched] = useState(false);
  // console.log(name);
  // console.log("errors: ", errors as any);
  // console.log("values", values);
  // console.log("touched: ", touched as any);
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
          // if ((values as FormikValues).type === "self") {
          //   console.log(Object.keys(errors as any).length);
          // if (Object.keys(errors as any).length === 1) {

          //   if ((values as any).type === "self") return setErrors({});
          //   console.log(errors);
          // } else if (Object.keys(errors as any).length === 2) {
          //   if ((values as any).type === "salaried") return setErrors({});
          //   console.log(errors);
          // }
          // }
          if (isEmptyObj(errors)) handleSubmit();
          // console.log("s", (values as any).type);
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
