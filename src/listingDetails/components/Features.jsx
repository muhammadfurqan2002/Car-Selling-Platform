import React from "react";
import { FaCheck } from "react-icons/fa6";

function Features({ features }) {
  console.log(features);
  return (
    <div className="p-5 my-7 bg-white rounded-xl border shadow-md">
      <h2 className="font-medium text-2xl ">Features</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-8">
        {features && Object.entries(features).map(([feature, value]) => (
          <div key={feature} className="flex gap-2 items-center">
            <FaCheck className="text-lg p-1 rounded-full bg-blue-100"/>
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
