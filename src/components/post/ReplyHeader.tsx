import { Add } from 'iconsax-react'
import React from 'react'

const ReplyHeader = ({ to, onCancel }:{to:string;onCancel?:() => void}) => {
  return (
    <div className='min-h-[35px] w-full flex items-center justify-between bg-replyHeaderBG pl-[13%] pr-[5%] box-border mb-1'>
        <h1 className="text-[0.9rem] text-white font-inter font-[400]">Replying to {to}</h1>
        <Add onClick={onCancel} color='white' size={22} className='rotate-45' />
    </div>
  )
}

export default ReplyHeader