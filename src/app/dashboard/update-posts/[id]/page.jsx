"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const UpdatePosts = ({ params }) => {
  const id = params.id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState(null);

  const [data, setData] = useState({
    title: "",
    content: "",
    secureUrl: "",
    publicId: "",
  });

  // Fetch data blog saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`/api/singlePost/${id}`);
      const post = await res.json();
      console.log(post);
      if (res.ok) {
        setBlog(post);
        setData({
          title: post?.title,
          content: post?.content,
          secureUrl: post?.secureUrl,
          publicId: post?.publicId,
        });
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/updatePosts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const error = await res.json();
        console.error("Error updating post:", error);
      }
    } catch (error) {
      console.error("An error occurred while updating the post:", error);
    }
  };

  const handleImageUpload = (result) => {
    setIsLoading(true);

    if (result.event === "success") {
      setData({
        ...data,
        secureUrl: result?.info?.secure_url,
        publicId: result?.info?.public_id,
      });
    }
    setIsLoading(false);
  };

  const removeImage = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicId: data.publicId,
        }),
      });
      if (res.ok) {
        setUrl(null);
        setPublicId(null);
        setData({
          ...data,
          secureUrl: null,
          publicId: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center flex-col items-center'>
          <h1 className='text-xl font-bold py-4'>Buat postingan</h1>
          <div className='flex flex-col gap-y-4 w-full'>
            <input
              type='text'
              placeholder='Judul Postingan'
              name='title'
              value={data.title}
              id='title'
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className='outline-none border-none bg-slate-200 p-2 rounded-md'
            />
            <textarea
              name='content'
              id='content'
              placeholder='Isi Postingan'
              cols='auto'
              rows='4'
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              className='outline-none border-none bg-slate-200 p-2 rounded-md'></textarea>
            <div className=''>
              <CldUploadButton
                uploadPreset='x5bav9pz'
                onUpload={handleImageUpload}
                className='w-full py-[5rem] bg-slate-300 relative'>
                {isLoading ? (
                  <div className='absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800'>
                    <p className='text-white text-lg font-bold'>Uploading...</p>
                  </div>
                ) : (
                  <div className=''>
                    <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-2 text-slate-100 bg-slate-800/50 ring-1 ring-slate-500 backdrop-blur-sm rounded-md'>
                      Upload Image
                    </h1>
                  </div>
                )}

                {data.publicId && (
                  <Image
                    src={data.secureUrl}
                    alt={data.publicId}
                    fill
                    className='object-cover rounded-md absolute'
                  />
                )}
              </CldUploadButton>
              {data.publicId && (
                <button
                  onClick={removeImage}
                  className='text-slate-100 px-3 py-2 bg-red-600 rounded-md w-fit'>
                  Remove Image
                </button>
              )}
            </div>
            <button
              type='submit'
              className='text-slate-100 px-3 py-2 hover:text-slate-500 bg-slate-800 rounded-md'>
              Edit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdatePosts;
