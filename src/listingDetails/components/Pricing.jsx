import { Button } from '@/components/ui/button'
import { MdOutlineLocalOffer } from "react-icons/md";
import React from 'react'

function Pricing({carDetail}) {
    console.log(carDetail)
  return (
    <div className='p-10 rounded-xl border shadow-md'>
      <h2>Our Price</h2>
      {/* <h2>{carDetail?.sellingPrice}</h2> */}
      <h2 className='font-bold text-4xl '>5000$</h2>
        <Button className="w-full mt-7 " size="lg"><MdOutlineLocalOffer className='text-lg mr-3'/> Make an Offer Price</Button>
    </div>
  )
}

export default Pricing
