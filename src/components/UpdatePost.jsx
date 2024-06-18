import Link from "next/link";
import React from "react";

const UpdatePost = () => {
  return (
    <>
      <div className=''>
        <Link href={`/dashboard/update-posts/$[id]`}>Edit</Link>
      </div>
    </>
  );
};

export default UpdatePost;
