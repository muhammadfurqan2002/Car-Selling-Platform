import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Data from '@/Shared/Data';
import { Link } from 'react-router-dom';
function Search() {
    const [cars,setCars]=useState(null)
    const [make,setMake]=useState(null)
    const [price,setPrice]=useState(null)
    return (
        <div className='w-[60%] p-2 md:p-5 bg-white rounded-md md:rounded-full flex flex-col md:flex md:flex-row gap-10 px5 items-center'>
            <Select onValueChange={(value)=>setCars(value)}>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="hidden md:block" />
            <Select onValueChange={(value)=>setMake(value)}>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Car Makes" />
                </SelectTrigger>
                <SelectContent>
                    {
                        Data.carMakes.map((data, index) => <SelectItem key={index} value={data.name}>{data.name}</SelectItem>)
                    }

                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="hidden md:block" />

            <Select onValueChange={(value)=>setPrice(value)}>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                    {
                        Data.Pricing.map((data, index) => <SelectItem key={index} value={data.amount}>{data.amount}</SelectItem>)
                    }

                </SelectContent>
            </Select>
            <Link to={`/search?cars=${cars}&make=${make}&price=${price}`}>
                <CiSearch className='bg-primary text-[50px] text-white rounded-full p-4 hover:scale-105 transition-all hover:cursor-pointer ' />

            </Link>
        </div>
    )
}

export default Search
