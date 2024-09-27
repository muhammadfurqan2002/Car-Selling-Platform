import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function DropDownField({item,handleInputChange,carInfo}) {
    return (
        <div>
            <Select defaultValue={carInfo?.[item?.name]} onValueChange={(value)=>handleInputChange(item.name,value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={carInfo?.[item?.name]?carInfo?.[item?.name]:item.label} />
                </SelectTrigger>
                <SelectContent>
                    {
                        item?.options?.map((option,index)=>(
                            <SelectItem value={option}>{option}</SelectItem>
                        ))
                    }
                    <SelectItem value="light">New</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default DropDownField
