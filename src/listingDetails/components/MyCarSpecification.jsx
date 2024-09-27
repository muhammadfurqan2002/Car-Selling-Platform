import IconField from "@/addListing/components/IconField";
import CarSpecification from "@/shared/CarSpecification";
import React from "react";

function MyCarSpecification({ carDetail }) {

  console.log(carDetail)

  return (
    <div className="p-10 rounded-xl border shadow-md mt-7">
      {/* {carDetail?.length>0 &&
        carDetail.map((car,index)=>(
            <div key={index}>
                <IconField icon={CarSpecification[index].icon} />
            </div>
        ))
      } */}

      {/* implement skelton effect */}
      <h2 className="font-medium text-xl">Specifications</h2>
      {carDetail && CarSpecification.map((item, index) => (
        <div key={index} className="mt-5 flex justify-between items-center">
          <h2 className="flex gap-2">
            <IconField icon={item?.icon} />
            {item?.name}
          </h2>
          <h2>{carDetail[item.name]}</h2>
        </div>
      ))}
    </div>
  );
}

export default MyCarSpecification;
