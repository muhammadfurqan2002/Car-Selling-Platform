import { Separator } from "@/components/ui/separator";
import { LuFuel } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";

function CarItem({ car }) {
  console.log(car);
  return (
    <Link to={`/listing-details/${car?.id}`}>
      <div className="relative rounded-xl bg-white border hover:shadow-md   cursor-pointer">
        <h2 className="absolute m-2 bg-green-400 px-3 rounded-full text-sm  text-white">
          New
        </h2>
        <img
          src={car?.images[0]?.imageUrl}
          width={"100%"}
          height={250}
          alt=""
          className="rounded-t-xl h-[180px] object-cover"
        />
        <div className="p-4">
          <h2 className="font-bold text-black text-lg mb-2">
            {car?.listingTitle}
          </h2>

          <Separator />
          <div className="grid grid-cols-3 mt-5">
            <div className="flex flex-col items-center">
              <LuFuel className="text-lg mb-2" />
              <h2>{car?.mileage} Miles</h2>
            </div>
            <div className="flex flex-col items-center">
              <TbBrandSpeedtest className="text-lg mb-2" />
              <h2>{car?.fuelType}</h2>
            </div>
            <div className="flex flex-col items-center">
              <GiGearStickPattern className="text-lg mb-2" />
              <h2>{car?.transmission}</h2>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">${car?.originalPrice}</h2>
            <h2 className="text-blue-300 text-sm flex items-center gap-2">
              View Details
              <MdOpenInNew />
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarItem;
