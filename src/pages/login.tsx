import { ThreeDots } from "@agney/react-loading";
import { Form, Formik, FormikHelpers } from "formik";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { useContext } from "react";
import * as Yup from "yup";
import Layout from "../components/layouts/Layout";
import ReactLoader from "../components/ReactLoader";
import FormikTextField from "../components/shared/FormikTextField";
import { AuthContext } from "../contexts/AuthContext";
import { baseURL } from "../utils/constants";

interface loginProps {}

interface Values {
  email: string;
  password: string;
}

const login2: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const { toggleAuth, changeUserData } = useContext(AuthContext);

  // creating validation schema with YUP
  const validation = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password should be atleast six letters")
      .required("Required"),
  });

  // Handling onSubmit property of formik with handleSubmit funtction
  const handleSubmit = async (
    values: Values,
    { setSubmitting, setFieldError }: FormikHelpers<Values>
  ) => {
    // creating loader button
    setSubmitting(true);

    const response = await fetch(`${baseURL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    });
    const data = await response.json();
    if (data.id) {
      toggleAuth(true);
      changeUserData(data);
      router.push("/dashboard");
    } else if (data.email) {
      setFieldError("email", data.email);
    } else if (data.password) {
      setFieldError("password", data.password);
    } else {
      setFieldError("email", "Something Went Wrong");
    }

    setSubmitting(false);
  };

  return (
    <Layout>
      <div className="pb-3 px-2 md:px-0">
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
                      <ReactLoader component={<ThreeDots width="50" />} />
                    ) : (
                      "Log In"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </section>
        </main>

        <div className="max-w-lg mx-auto text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="font-bold hover:underline">
              Sign up
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default login2;
