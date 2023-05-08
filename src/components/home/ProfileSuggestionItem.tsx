import React from 'react'

const ProfileSuggestionItem = ({ name, userName }:{name:string; userName:string}) => {
    return (
        <div className='w-[90%] min-h-[70px] rounded-[15px] bg-searchPanelItemBG border-[1px] border-primaryBorder flex items-center justify-start gap-x-2 pl-[3%] box-border mb-2'>
            <div className="min-w-[50px] min-h-[50px] rounded-full bg-white bg-no-repeat bg-center bg-cover"></div>
            <div className="flex flex-col items-start justify-start py-[1%] box-border">
                <span className="text-white font-[500] text-[1rem] font-inter ">{name}</span>
                <span className="text-[0.9rem] text-transparent bg-clip-text bg-gradient-to-tr from-primaryGradient2 to-primaryGradient1 font-inter font-[500] ">@{userName}</span>
            </div>
        </div>
    )
}

export default ProfileSuggestionItem