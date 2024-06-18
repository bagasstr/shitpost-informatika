import React from "react";

const detailPost = async (id) => {
  const res = await fetch(`/api/detailPost/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};
const page = async ({ params }) => {
  const id = params.id;
  const post = await detailPost(id);

  return <div>page</div>;
};

export default page;
