import React from 'react'

const MessageBox = () => {
  return (
    <div className='relative w-[92%] min-h-[65px] rounded-[10px] bg-messageBoxBG border-[1px] border-primaryBorder mb-2 flex items-center justify-between px-[4%] box-border'>
        <div className="relative min-w-[40px] min-h-[40px] rounded-full bg-white bg-center bg-no-repeat bg-cover mr-[5%]">
            <div className="absolute bottom-[1px] right-[0px] min-w-[12px] min-h-[12px] bg-green-500 rounded-full"></div>
        </div>
        <div className="w-full h-full flex flex-col items-start justify-center">
            <span className="text-white text-[1rem] font-inter font-[500] ">Athul vishnu</span>
            <span className="text-white text-[0.8rem] font-inter font-[300] mt-[1%]">Hey there.....</span>
        </div>
        <div className="absolute right-3 top-0 bottom-0 m-auto h-[12px] w-[12px] rounded-full bg-blue-700 "></div>
        <span className="absolute bottom-0 right-3 text-white text-[0.6rem] font-inter font-[300] ">1 min</span>
    </div>
  )
}

export default MessageBox