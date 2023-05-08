import { ReplyComment } from '@/constants/Types'
import React from 'react'

const ReplyComment = ({ comment,name,profileImage,commentedAt }:ReplyComment) => {
    return (
        <div className="w-full min-h-[50px] flex items-center justify-start gap-x-4 pl-[17%] box-border">
            <div style={{backgroundImage:`url(${profileImage})`}} className="min-w-[43px] min-h-[43px] rounded-full bg-testAvatar bg-white bg-no-repeat bg-center bg-cover "></div>
            <div className="w-full h-full flex flex-col items-start justify-between py-[2%] box-border">
                <span className="text-white text-[1.1rem] font-inter font-[500] cursor-pointer">{name} <span className="text-[1rem] font-[200]">replied :&nbsp; </span><span className="text-[0.9rem] font-[300]">{comment}</span></span>
                <span className="text-white text-[0.8rem] font-inter font-[700] cursor-pointer ">Like &nbsp;&nbsp;<span className=" font-[300]">10 m</span></span>
            </div>
        </div>
    )
}

export default ReplyComment