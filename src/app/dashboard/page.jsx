import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Posts from "@/components/PostsDashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Suspense fallback={<p>sabar lagi Loading...</p>}>
        <div className='mt-10'>
          <Posts />
        </div>
      </Suspense>
    </>
  );
};

export default page;
