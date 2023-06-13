import { Message } from '@/constants/Types'
import React from 'react'
import styles from '@/styles/Home.module.css'

const Message = ({ content, isSentByUser,timestamp }: Message) => {
  const getTime = () => {
    const date = new Date(timestamp);
    return `${date.getHours()>12 ?(( date.getHours() - 12) < 10?`0${date.getHours() -12 }`:date.getHours() - 12):date.getHours()} : ${date.getMinutes() < 10?`0${date.getMinutes()}`:date.getMinutes()} ${date.getHours()>12?'PM':'AM'}`
  }
  return (
    <div className={`${isSentByUser ? 'self-end border-blue-600' : 'self-start border-primaryBorder'} relative w-[50%] min-h-[45px] rounded-[10px] border-[1px] flex items-center justify-start pl-[2%] my-2`}>
      <p className="text-white text-[0.9rem] ">{content}</p>
      <span className="absolute bottom-1 right-1 text-[0.5rem] text-white_half_opacity font-[300] font-inter ">{getTime()}</span>
      <div className={`${styles.messageTip} ${styles.messageTipSetup} absolute z-[1000]  ${isSentByUser ? 'right-2 bg-blue-600 ' : 'left-2 bg-primaryBorder'} h-[15px] w-[15px] border-none flex flex-col items-center  box-border justify-start `}>
        <div className={`${styles.messageTip} w-[13px] h-[13px] bg-secondaryBG z-[1000]  bg-clip-border`}></div>
      </div>
    </div>
  )
}

export default Message