import React from 'react'
import ReplyComment from './ReplyComment'
import { Comment } from '@/constants/Types'

const CommentItem = ({isLiked ,comment,likes,name,profileImage,replies,commentedAt}:Comment) => {
  return (
    <div className='min-h-[55px] w-full flex flex-col items-center justify-start px-[3%] box-border ' >
      <div className="w-full min-h-[55px] flex items-center justify-start gap-x-4">
      <div style={{backgroundImage:`url(${profileImage})`}} className="min-w-[43px] min-h-[43px] rounded-full bg-white bg-no-repeat bg-center bg-cover "></div>
      <div className="w-full h-full flex flex-col items-start justify-between py-[2%] box-border">
        <span className="text-white text-[1.1rem] font-inter font-[500] cursor-pointer">{name} <span className="text-[1rem] font-[200]">Commented :&nbsp; </span><span className="text-[0.9rem] font-[300]">{comment}</span></span>
        <span className="text-white text-[0.8rem] font-inter font-[700] cursor-pointer ">Like &nbsp;&nbsp;<span className="font-[200]">Reply &nbsp;&nbsp;</span><span className=" font-[300]">10 m</span></span>
      </div>
      </div>
      {
        replies.map((reply,i) => (
          <ReplyComment comment={reply.comment} name={reply.name} profileImage={reply.profileImage}  key={i}/>
        ))
      }

    </div>
  )
}

export default CommentItem