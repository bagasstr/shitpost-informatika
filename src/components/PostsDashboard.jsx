"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPost] = useState([]);
  const [isEmpty, setEmpty] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/authorPost`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setPost(data?.posts);
      setEmpty(data?.posts?.length === 0);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoadingDelete((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`/api/deletePost/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPost(posts.filter((post) => post.id !== id));
        alert("Post deleted successfully");
        window.location.reload();
      } else {
        console.error("Error deleting post:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoadingDelete((prev) => ({ ...prev, [id]: false }));
    }
  };
  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center w-full h-dvh'>
          <h1>Loading...</h1>
        </div>
      ) : isEmpty ? (
        <div className='flex justify-center items-center w-full h-dvh'>
          <h1 className=''>Belum ada postingan</h1>
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-y-4 justify-center items-center mt-12'>
            {posts.map((post) => (
              <>
                <div
                  key={post.id}
                  className='p-5 bg-slate-50 shadow-md rounded-3xl w-full flex justify-between sm:items-center'>
                  <div className='flex gap-x-4'>
                    {post.secureUrl && (
                      <div className='relative sm:h-[95px] sm:w-[95px] md:h-[100px] md:w-[100px] sm:hidden lg:h-[85px] lg:w-[150px] rounded-xl'>
                        <Image
                          src={post.secureUrl}
                          alt={post.title}
                          fill
                          className='rounded-xl border-2 border-slate-200'
                        />
                      </div>
                    )}

                    <div className='py-4'>
                      <Link href={`/post/${post.id}`}>
                        <p className='text-2xl text-slate-900 font-bold line-clamp-2 text-wrap w-fit sm:w-fit leading-tight'>
                          {post.title}
                        </p>
                      </Link>
                      <p className='text-sm font-normal mt-4'>
                        Dibuat oleh: {post.author.name}
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-x-4 items-center sm:flex-col sm:gap-y-4 sm:ml-4 lg:ml-8'>
                    <div className='py-2 px-4 bg-slate-600 text-slate-100 rounded-md'>
                      <Link
                        href={`/dashboard/update-posts/${post.id}`}
                        className=''>
                        edit
                      </Link>
                    </div>
                    <div className='py-2 px-4 bg-red-600 text-slate-100 rounded-md'>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={isLoadingDelete[post.id]} // Nonaktifkan tombol saat loading
                      >
                        {isLoadingDelete[post.id] ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Posts;
