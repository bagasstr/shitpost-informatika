import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreatePosts from "@/components/CreatePosts";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const createPosts = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <CreatePosts />
    </>
  );
};

export default createPosts;
