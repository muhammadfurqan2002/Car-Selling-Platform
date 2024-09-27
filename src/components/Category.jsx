import Data from "@/shared/Data";
import React from "react";
import { Link, useParams } from "react-router-dom";

function Category() {
  return (
    <div className="mt-40">
      <h2 className="font-bold text-3xl text-center mb-6">Browse By Type</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6  lg:grid-cols-9 gap-6 px-20 ">
        {Data.Category.map((data, index) => (
          <Link key={index} to={`/search/${data.name}`}>
            <div className="border rounded-md hover:shadow-md p-3 items-center flex flex-col">
              <img src={data.icon} alt="" width={40} height={40} />
              <h2 className="pt-2">{data.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
