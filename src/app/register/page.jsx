"use client";
import LoginBtn from "@/components/LoginBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingRegister(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/login");
      } else {
        const errorData = await res.json();
        setErrors(errorData.error || {}); // Set error messages dari response
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingRegister(false);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='flex justify-center flex-col items-center'>
          <div className='border-b-2 border-slate-800 pb-4'>
            <div className='flex flex-col w-fit gap-y-4 my-5'>
              <h1 className='text-center text-3xl font-bold text-slate-800'>
                Register
              </h1>
              <div className=''>
                <input
                  name='name'
                  required
                  id='name'
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  type='text'
                  placeholder='name'
                  className='outline-none border-none bg-slate-200 p-2 rounded-md'
                />
                {errors.name && (
                  <p className='text-red-500 text-sm'>{errors.name}</p>
                )}
              </div>
              <div className=''>
                <input
                  name='email'
                  id='email'
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  type='email'
                  required
                  placeholder='Email'
                  className='outline-none border-none bg-slate-200 p-2 rounded-md'
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email}</p>
                )}
              </div>
              <div className=''>
                <input
                  name='password'
                  id='password'
                  required
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  type='password'
                  placeholder='Password'
                  className='outline-none border-none bg-slate-200 p-2 rounded-md'
                />
                {errors.password && (
                  <p className='text-red-500 text-sm'>{errors.password}</p>
                )}
              </div>
              <button
                type='submit'
                disabled={isLoadingRegister}
                className='bg-slate-800 rounded-md py-1 font-medium text-slate-100'>
                {isLoadingRegister ? "Loading..." : "Register"}
              </button>
              <p className='text-slate-800 text-sm'>
                Already have an account?{" "}
                <Link href='/login' className='text-slate-800 font-medium'>
                  Login
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

export default Register;
