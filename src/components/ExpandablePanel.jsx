import React, {useState} from "react"
import {GoChevronDown, GoChevronLeft} from "react-icons/go"

function ExpandablePanel({header, children}) {

  const [expanded, setExpended] = useState(false)

  return (
    <div className="mb-2 border rounded bg-gray-200 border-2 border-gray-500">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between ">
          {header}
        </div>
        <div onClick={() => setExpended(!expanded)}>
          {expanded ? <GoChevronDown/> : <GoChevronLeft/>}
        </div>
      </div>
      <div className="p-2 border-t">
        {expanded && children}
      </div>
    </div>
  )
}

export default ExpandablePanel