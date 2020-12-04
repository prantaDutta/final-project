import * as Yup from "yup";
import axios from "axios";
import { eightennYearsBackFromNow, formatDate } from "./functions";
import { FILE_SIZE, SUPPORTED_FORMATS } from "./constants";

export const yupValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  role: Yup.mixed()
    .oneOf(["lender", "borrower"], "Role should be Lender or Borrower")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .test("Unique Email", "Email already been taken", function (value) {
      return new Promise((resolve, _) => {
        axios
          .post("/api/unique-email", { email: value })
          .then((res) => {
            if (res.data.msg === "Email already been taken") {
              resolve(false);
            }
            resolve(true);
          })
          .catch(() => resolve(false));
      });
    })
    .required("Required"),
  gender: Yup.mixed()
    .oneOf(["male", "female"], "Gender should be Male or Female")
    .required("Required"),
  password: Yup.string()
    .min(6, "Password should be atleast six letters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  dateOfBirth: Yup.date()
    .max(
      formatDate(eightennYearsBackFromNow()).toString(),
      "You Must be 18 Years Old"
    )
    .required("Required"),
});

export const imageValidation = Yup.mixed()
  .required("A file is required")
  .test("fileSize", "File is too large", (value) => {
    // console.log("value: ", value);
    return value && value.size <= FILE_SIZE;
  })
  .test(
    "fileFormat",
    "Unsupported Format",
    (value) => value && SUPPORTED_FORMATS.includes(value.type)
  );
