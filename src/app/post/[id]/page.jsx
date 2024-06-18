import React from "react";

const detailPost = async (id) => {
  const res = await fetch(`https:localhost:3000/api/detailPost/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

const page = async ({ params }) => {
  const id = params.id;
  const post = await detailPost(id);

  return (
    <div>
      {post.map((post) => (
        <h1>{post.title}</h1>
      ))}
    </div>
  );
};

export default page;
