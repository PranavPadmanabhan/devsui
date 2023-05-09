import React from 'react'

const MessageHeader = ({ name }:{name?:string}) => {
  return (
    <div className='w-full h-[10%] min-h-[60px] flex items-center justify-start px-[3%] box-border max-h-[70px] border-b-[1px] border-b-primaryBorder '>
        <div className="min-h-[40px] min-w-[40px] rounded-full bg-white bg-center bg-no-repeat bg-cover "></div>
        <span className="text-white text-[1.2rem] font-inter font-[500] ml-4 mr-2">{name??"######"}</span>
        <div className="min-h-[10px] min-w-[10px] rounded-full bg-green-500"></div>
    </div>
  )
}

export default MessageHeader