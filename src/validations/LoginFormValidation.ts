import * as Yup from "yup";

Yup.addMethod(Yup.string, "min", function (min, msg) {
  return this.test({
    name: "min",
    exclusive: true,
    message: msg,
    test: (value) => !value || value.length >= min,
  });
});

export const loginFormSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password should be atleast six letters")
    .required("Required"),
});
