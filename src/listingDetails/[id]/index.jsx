import Header from "@/components/Header";
import DetailHeader from "../components/DetailHeader";
import { useParams } from "react-router-dom";
import { db } from "./../../../Configs";
import { CarImages, CarListing } from "./../../../Configs/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import Service from "@/Shared/Service";
import ImageGaller from "../components/ImageGaller";
import CarDescription from "../components/CarDescription";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import MyCarSpecification from "../components/MyCarSpecification";
import OwnerDetails from "../components/OwnerDetails";
import FinancialCalulator from "../components/FinancialCalulator";

function ListingDetails() {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();
  useEffect(() => {
    getCarDetails();
  }, []);
  const getCarDetails = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, id));
    const res = Service.formatResult(result);
    console.log(res[0]);
    setCarDetail(res[0]);
  };
  return (
    <div>
      <Header />

      <div className="p-10 md:px-20">
        <DetailHeader carDetail={carDetail} />
        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">
          {/* left */}
          <div className="md:col-span-2">

            {/* image gallery */}
                <ImageGaller carDetail={carDetail}/>

                {/* Description */}
                <CarDescription carDetail={carDetail}/>
            {/* features list */}
            <Features features={carDetail?.features}/>
            {/* Caluclator */}
            <FinancialCalulator carDetail={carDetail}/>
          </div>
          {/* right */}
          <div className="">
            {/* pricing */}
            <Pricing carDetail={carDetail}/>
            {/* car properites */}
            <MyCarSpecification carDetail={carDetail}/> 
            {/* owners details */}
            <OwnerDetails carDetail={carDetail}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
