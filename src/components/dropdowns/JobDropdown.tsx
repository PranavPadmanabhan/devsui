import { WorkRoleType } from '@/constants/Types';
import { ArrowDown2 } from 'iconsax-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Tick } from '../core/icons';

const JobDropdown = ({ className, selectedWorkRole, setSelectedWorkRole }: { className?: string, selectedWorkRole: WorkRoleType, setSelectedWorkRole: (selectedWorkRole:WorkRoleType) => void }) => {

    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
    const [values, setValues] = useState<WorkRoleType[]>([
        "Frontend Developer",
        "Backend Developer",
        'Fullstack Developer',
        'Flutter Developer',
        'IOS Developer',
        'ReactJS Developer',
        'React Native Developer',
        'AngularJS Developer',
        'Angular Developer'
    ])

    return (
        <div className={`${className} relative min-h-[45px] w-full min-w-[150px] max-w-[200px] rounded-[10px] flex flex-col items-center justify-start `}>
            <div onClick={() => setIsDropdownVisible(!isDropdownVisible)} className="cursor-pointer border-[1px] border-primaryBorder w-full min-h-[45px] rounded-[10px] flex items-center justify-between px-[5%] box-border ">
                <span className="text-white_half_opacity text-[0.9rem] font-inter font-[500] px-[2%] box-border ">Select Job Role</span>
                <ArrowDown2 variant='Bold' color='white' size={20} />
            </div>
            {
                isDropdownVisible
                &&
                <div className="absolute top-[103%] z-[100] w-full h-[200px] flex flex-col items-center justify-start rounded-[10px] bg-modalBG border-[1px] border-primaryBorder overflow-y-scroll scrollbar-hide">
                    {
                        values.map((value, i) => (
                            <div onClick={() => setSelectedWorkRole(selectedWorkRole === value?null:value)} key={i} className="flex items-center justify-between w-[92%] min-h-[38px] border-b-[1px] border-b-primaryBorder px-[2%] box-border cursor-pointer ">
                                <span className="text-[0.8rem] text-white_half_opacity font-inter font-[700]">{value}</span>
                                {selectedWorkRole === value && <Tick />}
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default JobDropdown