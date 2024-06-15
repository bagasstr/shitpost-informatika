"use client";
import LoginBtn from "@/components/LoginBtn";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
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
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res?.error) {
        router.push("/dashboard");
      }
    } catch (error) {
      throw error;
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
              <input
                label='email'
                onChange={(e) => setData({ ...data, email: e.target.value })}
                type='text'
                placeholder='email'
                className='outline-none border-none bg-slate-200 p-2 rounded-md'
              />
              <input
                label='password'
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type='password'
                placeholder='password'
                className='outline-none border-none bg-slate-200 p-2 rounded-md'
              />
              <button
                type='submit'
                className='bg-slate-800 rounded-md py-1 font-medium text-slate-100'>
                Login
              </button>
              <p className='text-slate-800 text-sm'>
                Don't have an account? <Link href='/register'>Register</Link>
              </p>
            </div>
          </div>
          <div className=''>
            <LoginBtn />
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
