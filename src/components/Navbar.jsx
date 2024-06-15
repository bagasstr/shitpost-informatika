"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useQuery } from "@tanstack/react-query";

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
        <div className='flex items-center'>
          {session?.user && user ? (
            <div className='flex flex-col gap-y-2'>
              <h1 className='text-xl font-semibold'>{session?.user?.name}</h1>
              <button
                onClick={() => handleLogout()}
                className='text-slate-100 px-3 py-2 hover:text-slate-500 bg-slate-800 rounded-md'>
                logOut
              </button>
            </div>
          ) : user ? (
            <>
              <Link href='/login'>
                <button className='text-slate-100 px-3 py-2 hover:text-slate-500 bg-slate-800 rounded-md'>
                  Login
                </button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Navbar;
