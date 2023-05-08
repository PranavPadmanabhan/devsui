import React from 'react'

const ActivitySectionItem = ({ Icon, onClick, title, isLiked }: { onClick?: () => void; title: string; Icon: any; isLiked?: boolean }) => {
    return (
        <div onClick={onClick} className={` w-[80%] lg:w-[100px]  h-full flex items-center justify-start cursor-pointer mr-[2px] lg:mr-0`}>
             <Icon className={`${title === "Comment"?'scale-[0.8] lg:scale-[1.2]':title === 'Share'?'scale-[0.7] lg:scale-[0.9]':'scale-[0.8] lg:scale-[1]'}`} isLiked={isLiked} /> 
            <h1 className={`ml-[2px] lg:ml-2 ${isLiked ? 'text-transparent bg-clip-text bg-gradient-to-tr from-primaryGradient1 to-primaryGradient2 ' : 'text-white'} font-inter font-[700] text-[0.8rem] lg:text-[1rem]`}>{title}</h1>
        </div>
    )
}

export default ActivitySectionItem