import { ThreeDots } from "@agney/react-loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/layouts/Layout";
import ReactLoader from "../components/ReactLoader";
import { AuthContext } from "../contexts/AuthContext";
import InputField from "../ReactHookForm/InputField";
import { baseURL } from "../utils/constants";
import { LoginFormValues } from "../utils/randomTypes";
import { loginFormSchema } from "../validations/LoginFormValidation";

interface login2Props {}

const login2: React.FC<login2Props> = ({}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, errors, setError } = useForm<LoginFormValues>(
    {
      resolver: yupResolver(loginFormSchema),
      mode: "onTouched",
      reValidateMode: "onBlur",
    }
  );
  const router = useRouter();
  const { toggleAuth, changeUserData } = useContext(AuthContext);

  const onSubmit = async (values: LoginFormValues) => {
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
      return router.push("/dashboard");
    } else if (data.email) {
      setError("email", {
        type: "manual",
        message: data.email,
      });
    } else if (data.password) {
      setError("password", {
        type: "manual",
        message: data.password,
      });
    } else {
      setError("email", {
        type: "manual",
        message: "Login Failed, Please Try Again",
      });
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
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="email"
              name="email"
              label="Email Address"
              error={errors.email?.message}
              placeholder="youremail@email.com"
              register={register}
            />
            <div className="mt-6">
              <InputField
                type="password"
                name="password"
                label="Password"
                error={errors.password?.message}
                placeholder="Enter Your Password"
                register={register}
              />
            </div>

            <div className="mt-6">
              <div className="text-right mb-4">
                <a
                  className="text-sm font-display font-semibold text-primary hover:text-indigo-800
                                        cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                className="bg-primary text-gray-100 p-3 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg transition-css"
              >
                {submitting ? (
                  <ReactLoader component={<ThreeDots width="50" />} />
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>
          <div className="mt-6 text-sm font-display font-semibold text-gray-700 text-center">
            Don't have an account ?{" "}
            <a className="cursor-pointer text-primary hover:text-indigo-800">
              Sign up
            </a>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default login2;