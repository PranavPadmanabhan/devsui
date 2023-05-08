import { Briefcase, CalendarEdit, Gallery, Magicpen, SearchNormal1 } from 'iconsax-react'
import React from 'react'
import SearchPanelItem from './SearchPanelItem'
import { useAppUiStore } from '@/store/app'
import { PostType } from '@/constants/Types'

const SearchPanel = () => {
  const { setIsCreatePostModalVisible,setPostType } = useAppUiStore();

  const onClickHandler = (postType:PostType) => {
    setPostType(postType);
    setIsCreatePostModalVisible(true)
  }

  return (
    <div className='sticky top-0 w-full lg:w-[98%] lg:h-[17%] lg:max-h-[170px] lg:min-h-[105px] rounded-[10px] bg-secondaryBG border-[1px] border-primaryBorder flex flex-col items-center justify-start py-[2%] box-border'>
      <div className="w-[95%] min-h-[40px] rounded-[30px] bg-searchBG border-[1px] border-primaryBorder flex items-center justify-between px-[2px] overflow-hidden ">
        <input placeholder='Search here...' type="text" className="w-[90%] h-full bg-transparent text-white text-[0.8rem] placeholder:text-[0.8rem] placeholder:text-white_half_opacity focus:outline-none pl-[15px] box-border" />
        <button className="h-[33px] w-[33px] rounded-full bg-search_button flex items-center justify-center ">
          <SearchNormal1 color='white' size={20} />
        </button>
      </div>
      <div className="w-[95%] h-full mt-2 flex items-center justify-between px-[2px] box-border">
        <SearchPanelItem onClick={() => onClickHandler('Ordinary')} Icon={Magicpen} title='Post' iconColor='#14D3DB' />
        <SearchPanelItem onClick={() => onClickHandler('Media')} Icon={Gallery} title='Media' iconColor='#34CA00' />
        <SearchPanelItem onClick={() => onClickHandler('Work')} Icon={Briefcase} title='Work' iconColor='#FFF50A' />
        <SearchPanelItem onClick={() => onClickHandler('Event')} Icon={CalendarEdit} title='Event' iconColor='#F94284' />
      </div>
    </div>
  )
}

export default SearchPanel