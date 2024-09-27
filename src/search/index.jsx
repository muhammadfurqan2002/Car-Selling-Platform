import Service from "@/Shared/Service"
import { db } from "./../../Configs"
import { CarImages, CarListing } from "./../../Configs/schema"
import { eq } from "drizzle-orm"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

function SearchByOption() {
    const [searchParam]=useSearchParams()
    const cars=searchParam.get('cars')
    const make=searchParam.get('make')
    const price=searchParam.get('price')
    console.log(cars,make,price)

    useEffect(()=>{
        getCarList();
    },[])

    const getCarList=async()=>{
        const result=await db.select().from(CarListing)
        .innerJoin(CarImages,eq(CarListing.id,CarImages.carListingId))
        .where(cars!=undefined&&eq(CarListing.condition,cars))
        .where(make!=undefined&&eq(CarListing.make,make))
        .where(price!=undefined&&eq(CarListing.SellingPrice,price))

        const res=Service.formatResult(result);
        console.log(res)
    }
    return (
    <div>
      
    </div>
  )
}

export default SearchByOption
