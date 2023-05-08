import React from 'react'
import { ChevronRoght } from '../core/icons'

const CommentInputSection = () => {
    return (
        <div className="w-full h-[50px] flex items-center justify-between gap-x-2 px-[3%] box-border ">
            <div className="min-w-[43px] min-h-[43px] rounded-full bg-white bg-no-repeat bg-center bg-cover "></div>
            <div className="w-[95%] min-h-[45px] rounded-[30px] bg-searchBG border-[1px] border-primaryBorder flex items-center justify-between px-[2px] overflow-hidden ">
                <input placeholder='Search here...' type="text" className="w-[90%] h-full bg-transparent text-white text-[0.8rem] placeholder:text-[0.8rem] placeholder:text-white_half_opacity focus:outline-none pl-[15px] box-border" />
                <button className="h-[38px] w-[38px] rounded-full bg-gradient-to-tr from-primaryGradient2 to-primaryGradient1 flex items-center justify-center ">
                    <ChevronRoght className='scale-[0.8] ml-[5%]' />
                </button>
            </div>
        </div>
    )
}

export default CommentInputSection