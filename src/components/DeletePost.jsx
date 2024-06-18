"use client";
import React from "react";

const DeletePost = async ({ params }) => {
  const res = await fetch(`/api/deletePost/${id}`, {
    method: "DELETE",
  });
  console.log(data);
  window.location.reload();
  fetch("http://localhost:3000/api/allPosts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return <div>DeletePost</div>;
};

export default DeletePost;
