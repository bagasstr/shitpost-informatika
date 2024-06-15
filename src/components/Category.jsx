import Link from "next/link";
import React from "react";
import { categoryData } from "../../data";

const Category = () => {
  return (
    <>
      <div className='mt-4 flex justify-center'>
        <div className=''>
          <ul className='flex gap-x-4'>
            {categoryData?.map((category) => (
              <li
                key={category.id}
                className='text-slate-100 bg-slate-900 px-3 py-1 rounded-md'>
                <Link href={`/category/${category.name}`} className='text-sm'>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
