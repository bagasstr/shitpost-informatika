import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Posts from "@/components/Posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      ini dashboard
      {session ? (
        <>
          <p className=''>{session?.user?.name}</p>
        </>
      ) : null}
      <Posts />
    </div>
  );
};

export default page;
