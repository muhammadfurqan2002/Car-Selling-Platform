import FakeData from '@/Shared/FakeData'
import React, { useEffect, useState } from 'react'
import CarItem from './CarItem'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { db } from './../../Configs'
import { CarImages, CarListing } from './../../Configs/schema'
import { desc, eq } from 'drizzle-orm'
import { useUser } from '@clerk/clerk-react'
import Service from '@/Shared/Service'

function MostSearchCar() {

  
  const [carListing,setCarListing]=useState([])
  useEffect(()=>{
    const getPopularCarList=async()=>{
      const result=await db.select().from(CarListing).leftJoin(CarImages,eq(CarListing.id,CarImages.carListingId)).orderBy(desc(CarListing.id)).limit(10);
        const res=Service.formatResult(result);
        setCarListing(res);
    }
    getPopularCarList()
    
  },[])

  return (
    <div className='mx-20'>
      <h2 className='font-bold text-3xl text-center my-6'>
        Most Search Cars
      </h2>
      <Carousel>
        <CarouselContent>
          {
            carListing.map((car, index) => (
              <CarouselItem key={index} className="basis-1/4"> <CarItem key={index} car={car} /> </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>


    </div>
  )
}

export default MostSearchCar
