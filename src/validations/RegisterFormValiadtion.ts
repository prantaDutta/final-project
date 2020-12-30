import Yup from "../lib/yup";

export const registerValitationSchema = Yup.object({
  name: Yup.string().required("Required"),
  role: Yup.mixed()
    .oneOf(["lender", "borrower"], "Role should be Lender or Borrower")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .test("Unique Email", "Email already been taken", function (value) {
      if (!value) return true;
      return new Promise((resolve, _) => {
        fetch("/api/unique-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: value }),
        }).then(async (res) => {
          const data = await res.json();
          if (data.msg === "Email already been taken") {
            resolve(false);
          }
          resolve(true);
        });
      });
    })
    .required("Required"),
  password: Yup.string()
    .min(6, "Password should be atleast six letters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
