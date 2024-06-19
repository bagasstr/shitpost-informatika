import React from "react";

const detailPost = async (id) => {
  const res = await fetch(`/api/detailPost/${id}`);
  const data = await res.json();
  const detailPost = data.data;
  return detailPost;
};

const page = async ({ params }) => {
  const id = params.id;
  const post = await detailPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1 className='text-3xl font-bold'>{post?.title}</h1>
      <p>Diposting oleh {post?.author?.name}</p>
      <p className='text-2xl'>{post?.content}</p>
    </div>
  );
};

export default page;
