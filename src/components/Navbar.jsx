"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState([]);
  useEffect(() => {
    setIsClient(true); // Set isClient menjadi true setelah komponen dimount di client
  }, []);

  useEffect(() => {
    if (session && status === "authenticated") {
      setUser(session?.user);
      localStorage.setItem("session", JSON.stringify(session));
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("session");
    await signOut();
    redirect("/");
  };
  return (
    <>
      <div className='border-b-2 px-4 pb-8 border-gray-600 flex justify-between'>
        <div className='flex justify-between items-center pt-8 '>
          <Link href='/' className=''>
            <h1 className='text-slate-500 text-4xl font-extrabold'>Shitpost</h1>
            <span className='text-4xl text-slate-950 font-extrabold'>
              Informatika
            </span>
            <div className='w-[300px]'>
              <p className='text-lg text-slate-950'>
                Tempat orang-orang memposting
              </p>
            </div>
          </Link>
        </div>
        <div className='flex items-end'>
          {session?.user && user ? (
            <>
              <div className='text-right space-y-2'>
                <h1 className='text-xl font-semibold underline-offset-8 underline'>
                  Hallo {session?.user?.name}
                </h1>
                <div className='space-x-4'>
                  <Link
                    href={"/dashboard/create-posts"}
                    className='px-3 py-2 bg-slate-200 text-slate-900 rounded-md font-medium'>
                    Buat Postingan
                  </Link>
                  <button
                    onClick={() => handleLogout()}
                    className='text-slate-100 px-3 py-2 hover:text-slate-500 bg-slate-800 rounded-md'>
                    Logout
                  </button>
                </div>
                <div className='flex gap-x-4 justify-end items-center mt-2 border-t-2 border-slate-800'>
                  <Link href={"/"}>Home</Link>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </div>
              </div>
            </>
          ) : user ? (
            <>
              <div className='flex gap-x-4 items-center'>
                <Link href='/'>Home</Link>
                <Link href='/login'>
                  <button className='text-slate-100 px-3 py-2 hover:text-slate-500 bg-slate-800 rounded-md'>
                    Login
                  </button>
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Navbar;
