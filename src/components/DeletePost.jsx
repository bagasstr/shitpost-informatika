"use client";
import React from "react";

const DeletePost = async ({ params }) => {
  const res = await fetch(`/api/deletePost/${id}`, {
    method: "DELETE",
  });
  window.location.reload();
  fetch("/api/allPosts");
  return <div>DeletePost</div>;
};

export default DeletePost;
