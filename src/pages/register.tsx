import { ThreeDots } from "@agney/react-loading";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Layout from "../components/layouts/Layout";
import InputSelectField from "../components/ReactHookForm/InputSelectField";
import InputTextField from "../components/ReactHookForm/InputTextField";
import ReactLoader from "../components/ReactLoader";
import { authContext } from "../contexts/authContext";
import { authenticatedUserData } from "../states/userStates";
import { UserRole } from "../utils/constantsArray";
import { RegisterFormValues } from "../utils/randomTypes";
import { registerValitationSchema } from "../validations/RegisterFormValiadtion";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  // const { toggleAuth, changeUserData } = useContext(authContext);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    errors,
    setError,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerValitationSchema),
    mode: "onTouched",
    reValidateMode: "onBlur",
  });
  const router = useRouter();
  const { toggleAuth } = useContext(authContext);
  const [, setUserData] = useRecoilState(authenticatedUserData);

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitting(true);
    const { data } = await axios.post(`/api/register`, {
      values,
    });
    if (data.id) {
      toggleAuth(true);
      setUserData(data);
      return router.push("/dashboard");
    }
    setError("name", {
      type: "manual",
      message: "Registration Failed, Please Try Again",
    });
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

          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <InputTextField
              name="name"
              label="Full Name"
              error={errors.name?.message}
              placeholder="John Doe"
              register={register}
            />

            <InputTextField
              type="email"
              name="email"
              label="Email Address"
              error={errors.email?.message}
              placeholder="youremail@email.com"
              register={register}
            />

            <InputSelectField
              name="role"
              label="You Are a"
              error={errors.role?.message}
              options={UserRole}
              register={register}
            />

            <InputTextField
              type="password"
              name="password"
              label="Password"
              error={errors.password?.message}
              placeholder="Enter Your Password"
              register={register}
            />

            <InputTextField
              type="password"
              name="confirmPassword"
              label="Password"
              error={errors.confirmPassword?.message}
              placeholder="Confirm Your Password"
              register={register}
            />

            <div className="mt-6">
              <button
                className="bg-primary text-gray-100 p-3 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                                shadow-lg transition-css"
              >
                {submitting ? (
                  <ReactLoader component={<ThreeDots width="50" />} />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm font-display font-semibold text-gray-700 text-center">
            Already have an account ?{" "}
            <Link href="/login">
              <a className="cursor-pointer text-primary hover:text-primaryAccent">
                Log In
              </a>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default register;
