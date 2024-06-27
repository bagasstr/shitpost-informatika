"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const revalidate = 3;
const CreatePosts = () => {
  const [url, setUrl] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [length, setLength] = useState(0);
  const [titleError, setTitleError] = useState("");
  const [duplicateSlug, setDuplicateSlug] = useState([]);
  const [data, setData] = useState({
    title: "",
    content: "",
    secureUrl: "",
    publicId: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (length > 60) {
      setTitleError("Judul tidak boleh lebih dari 60 karakter");
    } else {
      setTitleError(""); // Bersihkan pesan error jika valid
    }
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/allPosts`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setDuplicateSlug(data?.posts?.map((post) => post.title));
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchPosts();
  }, [data.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (length > 60) {
      alert("Judul tidak boleh lebih dari 60 karakter");
      return;
    }
    if (duplicateSlug.includes(data.title)) {
      alert("Judul sudah ada");
      return;
    }
    try {
      const res = await fetch("/api/createPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Postingan berhasil ditambahkan");
        router.push("/dashboard");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleImageUpload = (result) => {
    if (result.event === "success") {
      setUrl(result.info.secure_url);
      setPublicId(result.info.public_id);
      setData({
        ...data,
        secureUrl: result?.info?.secure_url,
        publicId: result?.info?.public_id,
      });
    }
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
          publicId,
        }),
      });
      if (res.ok) {
        setUrl(null);
        setPublicId(null);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center flex-col items-center'>
          <h1 className='text-xl font-bold py-4'>Buat postingan</h1>
          <div className='flex flex-col gap-y-4 w-full'>
            <div className='flex flex-col w-full'>
              <input
                type='text'
                placeholder='Judul Postingan'
                name='title'
                value={data.title}
                id='title'
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className='outline-none border-none cursor-text bg-slate-200 p-2 rounded-md'
                onInput={(e) => setLength(e.target.value.length)}
              />
              <div className='flex items-center justify-between sm:mt-2'>
                <p className={`sm:text-sm ${titleError ? "text-red-600" : ""}`}>
                  {length}/60
                </p>
                {titleError && (
                  <p className='text-red-600 text-sm'>{titleError}</p>
                )}
              </div>
            </div>
            <textarea
              name='content'
              id='content'
              placeholder='Isi Postingan'
              cols='auto'
              rows='4'
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              className='outline-none border-none bg-slate-200 p-2 rounded-md cursor-text'></textarea>
            <div className=''>
              <CldUploadButton
                uploadPreset='x5bav9pz'
                onUpload={handleImageUpload}
                className='w-full py-[5rem] bg-slate-300 relative'>
                {publicId && (
                  <Image
                    src={url}
                    alt={publicId}
                    fill
                    className='object-cover rounded-md absolute'
                  />
                )}
              </CldUploadButton>
              {publicId && (
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreatePosts;
