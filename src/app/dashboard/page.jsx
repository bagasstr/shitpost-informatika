"use client";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  if (!session || status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div>
      ini dashboard
      {status === "authenticated" ? (
        <>
          <p className=''>{session?.user?.name}</p>
        </>
      ) : null}
    </div>
  );
};

export default page;
