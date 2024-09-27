import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import Service from "@/shared/Service";
import CarItem from "@/components/CarItem";
import { FaTrash } from "react-icons/fa";

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    const getUserCarListing = async () => {
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.createdBy, user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(CarListing.id));

      const resp = Service.formatResult(result);
      setCarList(resp);
    };
    user && getUserCarListing();
  }, [user]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Link to={"/add-listing"}>
          <Button>+ Add New Listing</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7">
        {carList.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className="p-2 bg-gray-50 rounded-lg flex justify-between gap-2 ">
              <Link to={`/add-listing?mode=edit&id=${item?.id}`}  className="w-full">
                <Button variant="outline"  className="w-full">
                  Edit
                </Button>
              </Link>
              <Button variant="destructive">
                <FaTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListing;
