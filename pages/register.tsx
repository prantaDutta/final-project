import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import FormikTextField from "./../components/FormikTextField";

interface loginProps {}

interface Values {
  name: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const register: React.FC<loginProps> = ({}) => {
  const router = useRouter();

  const validation = Yup.object({
    name: Yup.string().required("Required"),
    role: Yup.mixed()
      .oneOf(["Lender", "Borrower"], "Role should be Lender or Borrower")
      .required("Required"),
    // email: Yup.string().email("Invalid Email").required("Required"),
    email: Yup.string()
      .email("Invalid email")
      .test("Unique Email", "Email already been taken", function (value) {
        return new Promise((resolve, reject) => {
          axios.post("/api/unique-email", { email: value }).then((res) => {
            if (res.data.msg === "Email already been taken") {
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

  // const handleSubmit = (values: Values, setSubmitting : FormikHelpers<Values>) => {

  // }

  return (
    <div className="h-10vh">
      <Layout>
        <div className="body-bg min-h-full pt-5 pb-6 px-2 md:px-0">
          <main className="bg-white max-w-lg mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
            <section>
              <h3 className="font-bold text-2xl">Welcome to GrayScale</h3>
              <p className="text-gray-600 pt-2">Create Your Account</p>
            </section>

            <section className="mt-5">
              <Formik
                initialValues={{
                  name: "",
                  password: "",
                  email: "",
                  role: "",
                  confirmPassword: "",
                }}
                onSubmit={async (
                  values: Values,
                  { setSubmitting }: FormikHelpers<Values>
                ) => {
                  setSubmitting(true);

                  try {
                    const response = await fetch("api/register", {
                      method: "POST",
                      headers: {
                        "content-type": "Application/JSON",
                      },
                      body: JSON.stringify(values),
                    });
                    const result = await response.json();
                    console.log(result);

                    router.push("/");
                  } catch (e) {
                    console.log(e);
                  }
                  setSubmitting(false);
                }}
                validationSchema={validation}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form
                    autoComplete="off"
                    className="flex flex-col"
                    method="POST"
                  >
                    <FormikTextField
                      label="Your Full Name *"
                      name="name"
                      type="text"
                    />

                    <FormikTextField
                      label="Enter your Email *"
                      name="email"
                      type="text"
                    />

                    <FormikTextField
                      label="You are a *"
                      name="role"
                      component="select"
                    >
                      <option value="Default">Choose One...</option>
                      <option value="Lender">Lender</option>
                      <option value="Borrower">Borrower</option>
                    </FormikTextField>

                    <FormikTextField
                      label="Your Password *"
                      type="password"
                      name="password"
                    />

                    <FormikTextField
                      label="Confirm Your Password *"
                      name="confirmPassword"
                      type="confirmPassword"
                    />

                    {/* <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                        htmlFor="name"
                      >
                        Your Full Name *
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      />
                      {touched.name && (
                        <ErrorMessage name="name">
                          {() => (
                            <div className="text-md text-red italic">
                              {errors.name}
                            </div>
                          )}
                        </ErrorMessage>
                      )}
                    </div> */}

                    {/* <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                        htmlFor="email"
                      >
                        Email *
                      </label>
                      <Field
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      />
                      {touched.email && (
                        <ErrorMessage name="email">
                          {() => (
                            <div className="text-md text-red italic">
                              {errors.email}
                            </div>
                          )}
                        </ErrorMessage>
                      )}
                    </div> */}

                    {/* <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                        htmlFor="role"
                      >
                        You are a *
                      </label>
                      <Field
                        component="select"
                        name="role"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      >
                        <option value="Default">Choose One...</option>
                        <option value="Lender">Lender</option>
                        <option value="Borrower">Borrower</option>
                      </Field>
                      {touched.role && (
                        <ErrorMessage name="role">
                          {() => (
                            <div className="text-md text-red italic">
                              {errors.role}
                            </div>
                          )}
                        </ErrorMessage>
                      )}
                    </div> */}

                    {/* <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                        htmlFor="password"
                      >
                        Password *
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      />
                      {touched.password && (
                        <ErrorMessage name="password">
                          {() => (
                            <div className="text-md text-red italic">
                              {errors.password}
                            </div>
                          )}
                        </ErrorMessage>
                      )}
                    </div> */}

                    {/* <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                        htmlFor="confirmPassword"
                      >
                        Confirm Password *
                      </label>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      />

                      {touched.confirmPassword && (
                        <ErrorMessage name="confirmPassword">
                          {() => (
                            <div className="text-md text-red italic">
                              {errors.confirmPassword}
                            </div>
                          )}
                        </ErrorMessage>
                      )}
                    </div> */}

                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6"
                      >
                        Forgot your password?
                      </a>
                    </div>

                    {isSubmitting ? (
                      <button
                        disabled
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                      >
                        <svg
                          className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-6 w-8"
                          viewBox="0 0 24 24"
                        ></svg>
                      </button>
                    ) : (
                      <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    )}
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

export default register;
