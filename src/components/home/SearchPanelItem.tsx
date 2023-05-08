import React from 'react'

const SearchPanelItem = ({ Icon, title, iconColor, onClick}:{title:string;Icon:any, iconColor:string;onClick?:() => void}) => {
  return (
    <div onClick={onClick} className='w-[25%] max-w-[70px] lg:max-w-[90px] h-[80%] min-h-[30px] rounded-[8px] lg:rounded-[12px] bg-searchPanelItemBG border-[1px] border-primaryBorder flex items-center justify-center cursor-pointer mr-[2px] lg:mr-0'>
        <Icon className='hidden lg:flex'  variant="Bold" color={iconColor} size={20} />
        <Icon className='flex lg:hidden'  variant="Bold" color={iconColor} size={17} />
        <h1 className='text-white text-[0.8rem] lg:text-[0.9rem] font-inter ml-1 ' >{title}</h1>
    </div>
  )
}

export default SearchPanelItem