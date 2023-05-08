import { Role } from '@/constants/Types';
import React from 'react'

const WorkRequestItem = ({ name, role, onAccept, onProfileVisit }: { name: string; role: Role; onAccept?: () => void; onProfileVisit?: () => void; }) => {
    return (
        <div className="w-full min-h-[30px] flex flex-col items-center justify-start">
            <div className='w-full min-h-[30px] flex items-center justify-between'>
                <div className="w-full h-full flex items-center justify-start ">
                    <div onClick={onProfileVisit} className="min-w-[42px] min-h-[42px] rounded-full bg-white mr-4"></div>
                    <div className="w-full h-full flex flex-col items-start justify-start pt-[1%] box-border">
                        <span onClick={onProfileVisit} className="text-white font-[500] text-[0.9rem] lg:text-[1rem] font-inter ">{name}</span>
                        <span className="text-[0.8rem] lg:text-[0.9rem] text-white_half_opacity font-inter font-[400]">{role}</span>
                    </div>
                </div>
                <div onClick={onAccept} className="w-[110px] min-h-[28px] lg:min-h-[30px] rounded-[5px] bg-search_button flex items-center justify-center cursor-pointer text-white text-[0.85rem] lg:text-[0.9rem] font-inter font-[500]">
                    Accept
                </div>
            </div>
            <div className="w-[80%] min-h-[1px] bg-primaryBorder mt-2"></div>
        </div>
    )
}

export default WorkRequestItem