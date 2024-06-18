"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPost] = useState([]);
  const [isEmpty, setEmpty] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/authorPost");
      const data = await res.json();
      setPost(data.posts);
      setEmpty(data?.posts?.length === 0);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

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
          <div className='flex flex-col justify-center items-center gap-y-4'>
            {posts.map((post) => (
              <>
                {/* Blog detail */}
                <div
                  key={post.id}
                  className='p-5 bg-slate-200 w-fit rounded-3xl'>
                  <div className='object-scale-down w-auto overflow-clip rounded-lg'>
                    {post.secureUrl ? (
                      <Image
                        src={post.secureUrl}
                        alt={post.title}
                        width={400}
                        height={400}
                        className='rounded-xl'
                      />
                    ) : null}
                  </div>
                  <div className='py-4'>
                    <Link href={`/post/${post.id}`}>
                      <p className='text-lg text-slate-900 font-bold line-clamp-1 text-wrap w-[400px] leading-tight'>
                        {post.title}
                      </p>
                    </Link>
                    <p className='text-sm font-medium mt-4'>
                      Dibuat oleh: {post.author.name}
                    </p>
                  </div>
                  <div className='flex gap-x-4 items-center justify-end'>
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
