import { ThreeDots } from "@agney/react-loading";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Layout from "../components/layouts/Layout";
import InputTextField from "../components/ReactHookForm/InputTextField";
import ReactLoader from "../components/ReactLoader";
import { authContext } from "../contexts/authContext";
import { authenticatedUserData } from "../states/userStates";
import { LoginFormValues } from "../utils/randomTypes";
import { loginValidationSchema } from "../validations/LoginFormValidation";

interface login2Props {}

const login: React.FC<login2Props> = ({}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, errors, setError } = useForm<LoginFormValues>(
    {
      resolver: yupResolver(loginValidationSchema),
      mode: "onTouched",
      reValidateMode: "onBlur",
    }
  );
  const router = useRouter();
  const { toggleAuth } = useContext(authContext);
  const [, setUserData] = useRecoilState(authenticatedUserData);

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitting(true);
    const { data, status } = await axios.post(`/api/login`, {
      values,
    });
    console.log("data: ", data);
    if (status === 200) {
      toggleAuth(true);
      setUserData(data);
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
            <h3 className="font-bold text-2xl">Welcome Back to GrayScale</h3>
            <p className="text-gray-600 pt-2">Log In to Your Account</p>
          </section>
          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <InputTextField
              type="email"
              name="email"
              label="Email Address"
              error={errors.email?.message}
              placeholder="youremail@email.com"
              register={register}
            />
            <div className="mt-6">
              <InputTextField
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
                  className="text-sm font-display font-semibold text-primary hover:text-primaryAccent
                                        cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                className="bg-primary text-gray-100 p-3 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
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
            <Link href="/register">
              <a className="cursor-pointer text-primary hover:text-primaryAccent">
                Sign Up
              </a>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default login;
