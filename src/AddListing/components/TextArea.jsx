import React from 'react'
import { Textarea } from "@/components/ui/textarea"

function TextArea({item,handleInputChange,carInfo}) {
  return (
    <div>
        <Textarea defaultValue={carInfo?.[item.name]} onChange={(e)=>handleInputChange(item.name,e.target.value)}/>
    </div>
  )
}

export default TextArea
