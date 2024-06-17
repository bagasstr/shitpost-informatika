"use client";
import LoginBtn from "@/components/LoginBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

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
                Register
              </h1>
              <input
                name='name'
                id='name'
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                type='text'
                placeholder='name'
                className='outline-none border-none bg-slate-200 p-2 rounded-md'
              />
              <input
                name='email'
                id='email'
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                type='text'
                placeholder='Email'
                className='outline-none border-none bg-slate-200 p-2 rounded-md'
              />
              <input
                name='password'
                id='password'
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type='password'
                placeholder='Password'
                className='outline-none border-none bg-slate-200 p-2 rounded-md'
              />
              <button
                type='submit'
                className='bg-slate-800 rounded-md py-1 font-medium text-slate-100'>
                Register
              </button>
              <p className='text-slate-800 text-sm'>
                Already have an account? <Link href='/login'>Login</Link>
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

export default Register;
