import { ThreeDots } from "@agney/react-loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { withIronSession } from "next-iron-session";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Layout from "../components/layouts/Layout";
import InputSelectField from "../components/ReactHookForm/InputSelectField";
import InputTextField from "../components/ReactHookForm/InputTextField";
import ReactLoader from "../components/ReactLoader";
import { authStatus } from "../states/authStates";
import api from "../utils/api";
import { logIn } from "../utils/auth";
import {
  BASE_API_URL,
  isProduction,
  NEXT_IRON_SESSION_CONFIG,
} from "../utils/constants";
import { UserRole } from "../utils/constantsArray";
import { ModifiedUserData, RegisterFormValues } from "../utils/randomTypes";
import { registerValitationSchema } from "../validations/RegisterFormValiadtion";

interface registerProps {
  user: ModifiedUserData;
}

const register: React.FC<registerProps> = ({ user }) => {
  // const { toggleAuth, changeUserData } = useContext(authContext);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerValitationSchema),
    mode: "onTouched",
    reValidateMode: "onBlur",
  });
  const [, toggleAuth] = useRecoilState(authStatus);

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitting(true);
    const { name, email, role, password, confirmPassword } = values;
    try {
      await api().get(`${BASE_API_URL}/sanctum/csrf-cookie`);
      await api().post("/register", {
        name,
        email,
        role,
        password,
        password_confirmation: confirmPassword,
      });
      const { data } = await api().get("/user");
      if (!isProduction) console.log(data);
      toggleAuth(true);
      logIn();
    } catch (e) {
      console.log(e);
    }
    setSubmitting(false);
    // try {
    //   const { data } = await axios.post(`/api/register`, {
    //     values,
    //   });
    //   if (data?.id) {
    //     toggleAuth(true);
    //     setUserData(data);
    //     return router.push("/dashboard");
    //   }
    //   setError("name", {
    //     type: "manual",
    //     message: "Registration Failed, Please Try Again",
    //   });
    //   setSubmitting(false);
    // } catch (e) {
    //   throw new Error("Can't Insert Data. Error From API");
    // }
  };

  return (
    <Layout data={user}>
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
              label="Confirm Password"
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

export const getServerSideProps = withIronSession(async ({ req }) => {
  const user = req.session.get("user");
  if (!user) {
    return { props: {} };
  }

  return {
    props: { user },
  };
}, NEXT_IRON_SESSION_CONFIG);

export default register;
