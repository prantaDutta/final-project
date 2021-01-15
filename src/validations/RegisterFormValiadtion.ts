import Yup from "../lib/yup";
import api from "../utils/api";

let newValue: any;

export const registerValitationSchema = Yup.object({
  name: Yup.string().required("Required"),
  role: Yup.mixed()
    .oneOf(["lender", "borrower"], "Role should be Lender or Borrower")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .test("Unique Email", "Email already been taken", async function (value) {
      if (!value) return true;
      if (value === newValue) return true;
      try {
        newValue = value;
        await api().post("/unique-email", {
          email: value,
        });
        return false;
      } catch (e) {
        return true;
      }
    })
    .required("Required"),
  password: Yup.string()
    .min(6, "Password should be atleast six letters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
