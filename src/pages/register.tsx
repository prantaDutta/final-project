import { useRouter } from "next/router";
import Layout from "../components/layouts/Layout";
import { Formik, Form, FormikHelpers } from "formik";
import axios from "axios";
import FormikTextField from "./../components/shared/FormikTextField";
import { yupValidationSchema } from "../utils/vaidationSchema";
import { useLoading, ThreeDots } from "@agney/react-loading";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface registerProps {}

interface Values {
  name: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: string;
}

const register: React.FC<registerProps> = ({}) => {
  const { toggleAuth, setUserId } = useContext(AuthContext);
  const router = useRouter();

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });

  // Handling onSubmit property of formik with handleSubmit funtction
  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    // creating loader button
    setSubmitting(true);

    try {
      const response = await axios.post("api/register", { values });
      const { userId } = response.data;
      toggleAuth(true);
      setUserId(userId);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
    setSubmitting(false);
  };

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
                  dateOfBirth: "",
                  gender: "",
                  confirmPassword: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={yupValidationSchema}
              >
                {/* There's an isSubmitting here */}
                {({ isSubmitting }) => (
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
                      label="Your Gender"
                      name="gender"
                      component="select"
                    >
                      <option value="Default">Choose One...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </FormikTextField>

                    <FormikTextField
                      label="You are a *"
                      name="role"
                      component="select"
                    >
                      <option value="Default">Choose One...</option>
                      <option value="lender">Lender</option>
                      <option value="borrower">Borrower</option>
                    </FormikTextField>

                    <FormikTextField
                      label="Your Date of Birth *"
                      name="dateOfBirth"
                      type="date"
                    />

                    <FormikTextField
                      label="Your Password *"
                      type="password"
                      name="password"
                    />

                    <FormikTextField
                      label="Confirm Your Password *"
                      name="confirmPassword"
                      type="password"
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
                        "Sign Up"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </section>
          </main>

          <div className="max-w-lg mx-auto text-center mt-12 mb-6">
            <p className="text-white">
              Already have an account?{" "}
              <a href="#" className="font-bold hover:underline">
                Sign in
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
