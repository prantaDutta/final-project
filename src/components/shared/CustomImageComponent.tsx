// import React, { Component } from "react";

import React from "react";

// // import withStyles from "@material-ui/core/styles/withStyles";
// // import customImageInputStyle from "./CustomImageInputStyle";
// // import classnames from "classnames";

// class CustomImageInput extends Component {
//   constructor(props) {
//     this.fileUpload = React.createRef();
//     this.showFileUpload = this.showFileUpload.bind(this);
//     this.handleImageChange = this.handleImageChange.bind(this);
//   }

//   state = {
//     file: undefined,
//     imagePreviewUrl: undefined
//   };

//   showFileUpload() {
//     if (this.fileUpload) {
//       this.fileUpload.current.click();
//     }
//   }

//   handleImageChange(e) {
//     e.preventDefault();
//     let reader = new FileReader();
//     let file = e.target.files[0];
//     if (file) {
//       reader.onloadend = () => {
//         this.setState({
//           file: file,
//           imagePreviewUrl: reader.result
//         });
//       };
//       reader.readAsDataURL(file);
//       this.props.setFieldValue(this.props.field.name, file);
//     }
//   }

//   showPreloadImage() {
//     const { errorMessage, classes } = this.props;
//     const { name } = this.props.field;
//     const { file, imagePreviewUrl } = this.state;

//     let comp = null;

//     if (errorMessage) {
//       comp = <Icon style={{ fontSize: 36 }}>error_outline</Icon>;
//     } else if (file) {
//       comp = (
//         <img className={classes.avatarThumb} src={imagePreviewUrl} alt="..." />
//       );
//     } else {
//       comp = <Icon style={{ fontSize: 36 }}>folder</Icon>;
//     }
//     return comp;
//   }

//   componentDidMount() {
//     console.log(this.fileUpload.current);
//   }

//   render() {
//     const { errorMessage, title, classes } = this.props;
//     const { name, onBlur } = this.props.field;

//     const avatarStyle = classnames(
//       classes.bigAvatar,
//       this.state.file ? [classes.whiteBack] : [classes.primaryBack],
//       { [classes.errorBack]: errorMessage }
//     );

//     return (
//       <div className={classes.container}>
//         <input
//           className={classes.hidden}
//           id={name}
//           name={name}
//           type="file"
//           onChange={this.handleImageChange}
//           ref={this.fileUpload}
//           // onBlur={onBlur}
//           //className="form-control"
//         />
//         <Typography className={classes.title} variant="h5">
//           {title}
//         </Typography>
//         <Avatar className={avatarStyle} onClick={this.showFileUpload}>
//           {this.showPreloadImage()}
//         </Avatar>

//         {errorMessage ? (
//           <Typography variant="caption" color="error">
//             {errorMessage}
//           </Typography>
//         ) : null}
//       </div>
//     );
//   }
// }

// export default withStyles(customImageInputStyle)(CustomImageInput);

import { Field, ErrorMessage, useField, FieldProps } from "formik";
import { InputHTMLAttributes } from "react";

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
  const [field, { error, touched }] = useField<FieldProps>(props);

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
        onChange={(e) => {
          var file = e.target.files[0];
          var reader = new FileReader();
          setFieldValue("attachment_filename", file.name);
          reader.onload = function (item) {
            setFieldValue("attachment_data", item.target.result);
          };

          reader.readAsDataURL(file);
        }}
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

export default FormikImageField;
