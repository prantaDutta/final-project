import { useRouter } from "next/router";
import Layout from "../components/layouts/Layout";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import FormikTextField from "../components/shared/FormikTextField";
import { useLoading, ThreeDots } from "@agney/react-loading";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface loginProps {}

interface Values {
  email: string;
  password: string;
}

const login2: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const { toggleAuth } = useContext(AuthContext);

  // creating validation schema with YUP
  const validation = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .test("Unique Email", "Email doesn't exist", function (value) {
        return new Promise((resolve, _) => {
          axios.post("/api/unique-email", { email: value }).then((res) => {
            if (res.data.msg !== "Unique Email") {
              resolve(true);
            }
            resolve(false);
          });
        });
      })
      .required("Required"),
    password: Yup.string()
      .min(6, "Password should be atleast six letters")
      .test("Password Matching", "Wrong Credentials", function (value) {
        return new Promise((resolve, _) => {
          axios
            .post("/api/password-match", {
              email: this.parent.email,
              password: value,
            })
            .then((res) => {
              if (res.data.msg === "Wrong Credentials") {
                resolve(false);
              }
              resolve(true);
            });
        });
      })
      .required("Required"),
  });

  // Handling onSubmit property of formik with handleSubmit funtction
  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    // creating loader button
    setSubmitting(true);

    try {
      const response = await axios.post("api/login", { values });

      const { accessToken } = response.data;
      // console.log("l", accessToken);
      if (accessToken) {
        localStorage.setItem("authToken", JSON.stringify(accessToken));
      } else {
        console.log("Please Log In again");
      }

      // const authHeader = req.headers["authorization"];
      // const token = authHeader && authHeader.split(" ")[1];
      // if (token == null) return res.sendStatus(401);

      toggleAuth();
      router.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
    // setSubmitting(false);
  };

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });

  return (
    <div className="h-10vh">
      <Layout>
        <div className="body-bg min-h-full pt-5 pb-6 px-2 md:px-0">
          <main className="bg-white max-w-lg mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
            <section>
              <h3 className="font-bold text-2xl">Welcome to GrayScale</h3>
              <p className="text-gray-600 pt-2">Log In to Your Account</p>
            </section>

            <section className="mt-5">
              <Formik
                enableReinitialize
                initialValues={{
                  password: "",
                  email: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validation}
              >
                {/* There's an isSubmitting here */}
                {({ isSubmitting }) => (
                  <Form
                    autoComplete="off"
                    className="flex flex-col"
                    method="POST"
                  >
                    <FormikTextField
                      label="Enter your Email *"
                      name="email"
                      type="text"
                    />

                    <FormikTextField
                      label="Your Password *"
                      type="password"
                      name="password"
                    />

                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6"
                      >
                        Forgot your password?
                      </a>
                    </div>

                    <button
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                      type="submit"
                    >
                      {isSubmitting ? (
                        <section
                          className="p-1.5 flex justify-center"
                          {...containerProps}
                        >
                          {indicatorEl} {/* renders only while loading */}
                        </section>
                      ) : (
                        "Log In"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </section>
          </main>

          <div className="max-w-lg mx-auto text-center mt-12 mb-6">
            <p className="text-white">
              Don't have an account?{" "}
              <a href="#" className="font-bold hover:underline">
                Sign up
              </a>
              .
            </p>
          </div>

          <footer className="max-w-lg mx-auto flex justify-center text-white">
            <a href="#" className="hover:underline">
              Contact
            </a>
            <span className="mx-3">•</span>
            <a href="#" className="hover:underline">
              Privacy
            </a>
          </footer>

          <style jsx>
            {`
              .body-bg {
                background-color: #9921e8;
                background-image: linear-gradient(
                  315deg,
                  #9921e8 0%,
                  #5f72be 74%
                );
              }
            `}
          </style>
        </div>
      </Layout>
    </div>
  );
};

export default login2;
