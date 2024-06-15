"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginBtn = () => {
  return (
    <>
      <div className='mt-4'>
        <div className='flex justify-center flex-col items-center'>
          <h1 className='text-base font-medium text-slate-950'>OR</h1>
          <div className='flex flex-col gap-y-4 mt-4'>
            <button
              onClick={() => signIn("google")}
              className='text-slate-100 bg-slate-700 hover:bg-slate-800 px-3 py-2 rounded-md'>
              <span className='flex items-center gap-x-2'>
                <Image
                  src='/google-logo.svg'
                  alt='logo'
                  width={20}
                  height={20}
                />
                Sign In With Google
              </span>
            </button>
            <button
              onClick={() => signIn("github")}
              className='text-slate-100 bg-slate-700 hover:bg-slate-800 px-3 py-2 rounded-md'>
              <span className='flex items-center gap-x-2'>
                <Image
                  src='/github-logo.svg'
                  className='invert'
                  alt='logo'
                  width={20}
                  height={20}
                />
                Sign In With GitHub
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginBtn;
