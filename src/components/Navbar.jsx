"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";

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
      <div className='lg:border-b-2 sm:border-b-2 sm:border-slate-900  pb-8 border-gray-600 flex justify-between'>
        <div className='flex justify-between items-center pt-8 '>
          <Link href='/' className=''>
            <div className=''>
              <h1 className='text-slate-600 text-4xl sm:text-3xl sm:font-bold font-extrabold'>
                Shitpost
              </h1>
              <span className='text-4xl text-slate-900 font-extrabold sm:text-2xl sm:font-bold '>
                Informatika
              </span>
            </div>
            <div className='pt-2'>
              <p className='text-lg text-slate-950 sm:text-sm sm:font-medium'>
                Tempat orang-orang memposting
              </p>
            </div>
          </Link>
        </div>
        <div className='flex items-end'>
          {session?.user && user ? (
            <>
              <div className='sm:flex sm:flex-col items-end'>
                <button
                  onClick={() => handleLogout()}
                  className='text-slate-100 px-3 py-2 hover:text-slate-500 bg-slate-800 rounded-md sm:mt-2'>
                  <LogOut />
                </button>
                <h1 className='text-xl font-semibold underline-offset-2 underline'>
                  Hallo {session?.user?.name}
                </h1>
                <div className='sm:flex sm:gap-x-2'>
                  <Link
                    href={"/dashboard/create-posts"}
                    className='px-3 py-2 bg-slate-200 rounded-md'>
                    <p className='text-slate-900 font-medium sm:text-sm'>
                      Buat Postingan
                    </p>
                  </Link>
                </div>
                <div className='flex gap-x-4 sm:pt-3 justify-end items-center mt-2 border-t-2 border-slate-800'>
                  <Link href={"/"}>Home</Link>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='flex gap-x-4 items-center sm:flex-col-reverse sm:gap-y-4'>
                <Link href='/'>Home</Link>
                <Link href='/login'>
                  <button className='text-slate-100 px-3 py-2 hover:text-slate-500 bg-slate-800 rounded-md'>
                    Login
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
