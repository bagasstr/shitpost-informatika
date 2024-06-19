"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HomePosts = () => {
  const [posts, setPost] = useState([]);
  const [isEmpty, setEmpty] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/allPosts`);
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
          <div className='flex flex-col gap-y-4 items-center mt-12'>
            {posts.map((post) => (
              <>
                <div
                  key={post.id}
                  className='p-5 bg-slate-50 shadow-md rounded-3xl w-11/12'>
                  {post.secureUrl ? (
                    <div className='h-[200px] w-[200px] bg-red-600 rounded-lg'>
                      <Image
                        src={post.secureUrl}
                        alt={post.title}
                        width={200}
                        height={200}
                        className='rounded-xl border-2 border-slate-200 '
                      />
                    </div>
                  ) : null}
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
                  {status === "authenticated" &&
                  session.user.email === post.author.email ? (
                    <div className='flex gap-x-4 items-center justify-end'>
                      {/* <div className='py-2 px-4 bg-slate-600 text-slate-100 rounded-md'>
                        <Link
                          href={`/dashboard/update-posts/${post.id}`}
                          className=''>
                          edit
                        </Link>
                      </div> */}
                      <div className='py-2 px-4 text-sm bg-red-600 text-slate-100 rounded-md'>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={isLoadingDelete[post.id]} // Nonaktifkan tombol saat loading
                        >
                          {isLoadingDelete[post.id] ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default HomePosts;
