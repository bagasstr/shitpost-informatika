import Image from "next/image";
import React from "react";

const getAllPosts = async () => {
  const res = await fetch("http://localhost:3000/api/allPosts");
  const data = await res.json();
  console.log(data);
  return data;
};
const Posts = async () => {
  const posts = await getAllPosts();
  return (
    <>
      <div className='flex flex-col gap-y-4'>
        {posts.posts.map((post) => (
          <div key={post.id} className='p-5 bg-slate-200'>
            <div className='object-cover overflow-clip'>
              {post.secureUrl ? (
                <Image
                  src={post.secureUrl}
                  alt={post.title}
                  width={1000}
                  height={1000}
                />
              ) : null}
            </div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>{post.author.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
