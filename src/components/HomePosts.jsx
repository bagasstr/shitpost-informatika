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
      const res = await fetch(`/api/allPosts`);
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
            {posts?.map((post) => (
              <>
                <div
                  key={post.id}
                  className='p-5 bg-slate-50 shadow-md rounded-3xl w-full flex justify-between'>
                  <div className='flex gap-x-4'>
                    {post.secureUrl ? (
                      <div className='relative sm:h-[95px] sm:w-[95px] md:h-[100px] md:w-[100px] lg:h-[100px] lg:w-[100px] rounded-xl'>
                        <Image
                          src={post.secureUrl}
                          alt={post.title}
                          // width={400}
                          // height={400}
                          fill
                          className='rounded-xl border-2 border-slate-200'
                        />
                      </div>
                    ) : null}
                    <div className='py-4'>
                      <Link href={`/post/${post.id}`}>
                        <p className='text-2xl text-slate-900 font-bold line-clamp-1 text-wrap w-auto sm:w-fit leading-tight'>
                          {post.title}
                        </p>
                      </Link>
                      <p className='text-sm font-normal mt-4'>
                        Dibuat oleh: {post.author.name}
                      </p>
                    </div>
                  </div>
                  {status === "authenticated" &&
                  session?.user?.email === post?.author?.email ? (
                    <div className='flex gap-x-4 items-center justify-end '>
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
