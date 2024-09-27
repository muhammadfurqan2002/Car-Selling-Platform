import React from 'react'
import { Input } from "@/components/ui/input"


function InputField({item,handleInputChange,carInfo}) {
    // console.log(item)
  return (
    <div>
      <Input  type={`${item.fieldType}`} defaultValue={carInfo?.[item.name]} onChange={((e)=>handleInputChange(item.name,e.target.value))} required={item?.required} name={item?.name} />

    </div>
  )
}

export default InputField
