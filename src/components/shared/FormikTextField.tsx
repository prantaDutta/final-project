// import { Field, ErrorMessage, useField, FieldProps } from "formik";
// import { InputHTMLAttributes } from "react";

// type FormikTextFieldProps = InputHTMLAttributes<HTMLElement> & {
//   label: string;
//   name: string;
//   component?: string;
// };

// const FormikTextField: React.FC<FormikTextFieldProps> = ({
//   label,
//   size: _,
//   ...props
// }) => {
//   // const [field, { touched, errors }] = useField(props);
//   const [field, { error, touched }] = useField<FieldProps>(props);
//   // console.log(touched, error);

//   return (
//     <div className="mb-3 pt-3 rounded bg-gray-200">
//       <label
//         className="block text-gray-700 text-sm font-bold mb-2 ml-3"
//         htmlFor={field.name}
//       >
//         {label}
//       </label>

//       <Field
//         {...field}
//         {...props}
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

// export default FormikTextField;

import { Field, ErrorMessage, useField, FieldProps } from "formik";
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
  // const [field, { touched, errors }] = useField(props);
  const [field, { error, touched }] = useField<FieldProps>(props);
  // console.log(touched, error);

  return (
    <div className="mb-6 pt-3 rounded bg-gray-200">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 ml-3"
        htmlFor={field.name}
      >
        {label}
      </label>
      <Field
        {...field}
        {...props}
        id={field.name}
        className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 ${
          touched && error ? "border-red-600" : ""
        }`}
      />
      {touched && (
        <ErrorMessage name={field.name}>
          {() => <div className="text-md text-red-600 italic">{error}</div>}
        </ErrorMessage>
      )}
    </div>
  );
};

export default FormikTextField;
