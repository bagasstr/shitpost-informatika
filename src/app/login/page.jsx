"use client";
import LoginBtn from "@/components/LoginBtn";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLogin, setLoadingLogin] = useState(false);
  useEffect(() => {
    if (session?.user && status === "authenticated") {
      redirect("/dashboard");
    }
    setIsLoading(false);
  }, [session, status]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  if (isLoading) return <p>Loading...</p>;
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        const error = JSON.parse(res.error);
        setErrors(error);
      }
      if (!res?.error) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoadingLogin(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='flex justify-center flex-col items-center'>
          <div className='border-b-2 border-slate-800 pb-4'>
            <div className='flex flex-col w-fit gap-y-4 my-5'>
              <h1 className='text-center text-3xl font-bold text-slate-800'>
                Login
              </h1>
              <div className='space-y-4'>
                <div className=''>
                  <input
                    label='email'
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    required
                    type='email'
                    placeholder='email'
                    className='outline-none border-none bg-slate-200 p-2 rounded-md'
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm'>{errors.email}</p>
                  )}
                </div>
                <div className=''>
                  <input
                    label='password'
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    required
                    type='password'
                    placeholder='password'
                    className='outline-none border-none bg-slate-200 p-2 rounded-md'
                  />
                  {errors.password && (
                    <p className='text-red-500 text-sm'>{errors.password}</p>
                  )}
                </div>
              </div>
              <button
                type='submit'
                disabled={isLoadingLogin}
                className='bg-slate-800 rounded-md py-1 font-medium text-slate-100'>
                {isLoadingLogin ? "Loading..." : "Login"}
              </button>
              <p className='text-slate-700 text-sm'>
                Don't have an account?{" "}
                <Link href='/register' className='text-slate-800 font-medium'>
                  Register
                </Link>
              </p>
            </div>
          </div>
          {/* <div className=''>
            <LoginBtn />
          </div> */}
        </div>
      </form>
    </>
  );
};

export default Login;
