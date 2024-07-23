import Image from "next/image";
import React from "react";

const detailPost = async (id) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/detailPost/${id}`, {
    cache: "no-store",
  });
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
    <>
      <div className='lg:mt-8 sm:mt-8'>
        <div className=''>
          <h1 className='lg:text-2xl lg:font-bold sm:text-2xl sm:font-extrabold'>
            {post.title}
          </h1>
          <div className=''>
            <p className='lg:text-sm sm:text-sm'>
              Penulis: <span className='font-medium'>{post.author.name}</span>
            </p>
          </div>
          <div className='my-8'>
            {post.secureUrl && (
              <Image
                src={post?.secureUrl}
                alt={post?.title}
                width={800}
                height={500}
              />
            )}
          </div>
          <div className='mt-8'>
            <p className='text-justify'>{post.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
