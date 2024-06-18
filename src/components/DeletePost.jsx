"use client";
import React from "react";

const DeletePost = async ({ params }) => {
  const id = params.id;
  const res = await fetch(`/api/deletePost/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    alert("Post deleted successfully");
  } else {
    console.error("Error deleting post:", res.statusText);
  }
  window.location.reload();
  return <div>DeletePost</div>;
};

export default DeletePost;
