import { ThreeDots } from "@agney/react-loading";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import Layout from "../components/layouts/Layout";
import ReactLoader from "../components/ReactLoader";
import { AuthContext } from "../contexts/AuthContext";
import { baseURL } from "../utils/constants";
import { yupValidationSchema } from "../utils/vaidationSchema";
import FormikTextField from "./../components/shared/FormikTextField";

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
  const { toggleAuth, changeUserData } = useContext(AuthContext);
  const router = useRouter();

  // Handling onSubmit property of formik with handleSubmit funtction
  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    // creating loader button
    setSubmitting(true);

    const response = await fetch(`${baseURL}/api/register`, {
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
    }
    setSubmitting(false);
  };

  return (
    <Layout>
      <div className="pb-3 px-2 md:px-0">
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

                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <ReactLoader component={<ThreeDots width="50" />} />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </section>
        </main>

        <div className="max-w-lg mx-auto text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="#" className="font-bold hover:underline">
              Sign in
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default register;
