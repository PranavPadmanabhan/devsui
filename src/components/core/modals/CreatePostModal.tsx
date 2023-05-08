import { useAppUiStore } from '@/store/app'
import { Add, Briefcase, CalendarEdit, Gallery, GalleryAdd, Magicpen } from 'iconsax-react'
import React from 'react'
import { ChevronRoght } from '../icons'
import { PostType } from '@/constants/Types'
import JobDropdown from '@/components/dropdowns/JobDropdown'
import NavBar from '@/components/shared/NavBar'
import BottomTabBar from '@/components/shared/BottomTabBar'

const CreatePostModal = () => {

    const { setIsCreatePostModalVisible, postType, setPostType } = useAppUiStore()

    return (
        <div className='fixed z-[1000] top-0 w-screen h-screen bg-black lg:bg-modalContainerBG backdrop-blur-0 lg:backdrop-blur-[10px] flex flex-col items-center justify-start lg:justify-center'>
            <NavBar />
            <div className="w-full h-[90%]  max-h-full max-w-full rounded-[3px] lg:w-[70%] lg:h-[80%] lg:max-h-[500px] lg:max-w-[450px] lg:rounded-[25px] bg-modalBG border-[1px] border-primaryBorder overflow-hidden flex flex-col items-center justify-between">
                <div className="relative w-full h-[10%] max-h-[50px] border-b-[1px] border-b-primaryBorder flex items-center justify-center mb-2">
                    <span className="text-white text-[1.3rem] font-inter font-[500]">Create Post</span>
                    <Add onClick={() => setIsCreatePostModalVisible(false)} color='white' size={26} className='absolute top-[15%] right-[2%] cursor-pointer rotate-45' />
                </div>
                <RenderPostTypes postType={postType} />
                <div className="w-[87%] min-h-[50px] rounded-[30px] border-[1px] border-primaryBorder flex items-center justify-between pl-[2%] pr-[4px] box-border mb-3 mt-2">
                    <span className='text-[0.8rem] lg:text-[0.9rem] text-white_half_opacity font-inter font-[400]'>Add your post</span>
                    <div className="w-[67%] lg:w-[55%] h-full flex items-center justify-between">
                        <PostType onClick={() => setPostType('Ordinary')} Icon={Magicpen} iconColor='#14D3DB' isActive={postType === 'Ordinary'} />
                        <PostType onClick={() => setPostType('Media')} Icon={Gallery} iconColor='#34CA00' isActive={postType === 'Media'} />
                        <PostType onClick={() => setPostType('Work')} Icon={Briefcase} iconColor='#FFF50A' isActive={postType === 'Work'} />
                        <PostType onClick={() => setPostType('Event')} Icon={CalendarEdit} iconColor='#F94284' isActive={postType === 'Event'} />
                        <button className="min-h-[38px] min-w-[38px] rounded-full bg-gradient-to-tr from-primaryGradient2 to-primaryGradient1 flex items-center justify-center ">
                            <ChevronRoght className='scale-[0.8] ml-[5%]' />
                        </button>
                    </div>
                </div>
            </div>
            <BottomTabBar type='relative' />
        </div>
    )
}


const PostType = ({ Icon, iconColor, onClick, isActive }: { Icon: any; iconColor: string; onClick?: () => void, isActive: boolean }) => {
    return (
        <div onClick={onClick} className={`min-w-[38px] min-h-[38px] rounded-full flex items-center justify-center ${isActive ? 'bg-postTypeActive' : 'bg-transparent'} cursor-pointer`}>
            <Icon variant="Bold" color={iconColor} size={24} />
        </div>
    )
}

const RenderPostTypes = ({ postType }: { postType: PostType }) => {
    const { selectedWorkRole, setselectedWorkRole, setPostType } = useAppUiStore()
    switch (postType) {
        case 'Ordinary':
            return (
                <div className="w-full h-full flex flex-col items-center justify-start">
                    <div className="min-h-[60px] w-full flex items-center justify-start pl-5 box-border gap-x-2">
                        <div className="min-w-[45px] min-h-[45px] rounded-full bg-white bg-no-repeat bg-center bg-cover "></div>
                        <span className="text-white text-[1rem] font-inter font-[500]">Amal Raj</span>
                    </div>
                    <textarea placeholder='share your thoughts..' style={{ resize: 'none' }} className='w-full h-full text-white text-[0.9rem] font-inter bg-transparent pl-5 pt-2 focus:outline-none' />
                </div>
            )
        case 'Media':
            return (
                <div className="w-full h-full flex flex-col items-center justify-start">
                    <div className="min-h-[60px] w-full flex items-center justify-start pl-5 box-border gap-x-2">
                        <div className="min-w-[45px] min-h-[45px] rounded-full bg-white bg-no-repeat bg-center bg-cover "></div>
                        <span className="text-white text-[1rem] font-inter font-[500]">Amal Raj</span>
                    </div>
                    <textarea placeholder='share your thoughts..' style={{ resize: 'none' }} className='w-full min-h-[60px]  text-white text-[0.9rem] font-inter focus:outline-none bg-transparent pl-5 pt-2' />
                    <div className="w-[80%] lg:w-[75%] h-[50%] max-h-[250px] rounded-[10px] border-[1px] border-primaryBorder flex items-center p-[10px] box-border">
                        <div className="relative w-full h-full rounded-[5px] bg-media flex flex-col items-center justify-center">
                            {/* <Add onClick={() => setPostType('Ordinary')} color='white' size={26} className='absolute z-[1000] top-[2%] right-[1%] cursor-pointer rotate-45' /> */}
                            <div className="min-h-[40px] min-w-[40px] rounded-full bg-lightGrey flex flex-col items-center justify-center ">
                                <GalleryAdd variant='Bold' color='white' size={26} />
                            </div>
                            <span className="text-white text-[1.1rem] font-inter font-[700] mt-1">Add Photo/Video</span>
                            <span className="text-white_half_opacity text-[0.9rem] font-inter font-[500]">drag and drop to add file</span>
                            <input type="file" name="" id="" className='absolute top-0 border-2 bottom-0 m-auto h-full w-full cursor-pointer opacity-0' />
                        </div>
                    </div>
                    <div className="min-h-[20px] w-full flex items-center justify-start my-2 pl-[14%] box-border">
                        <div className="min-h-[15px] min-w-[15px] rounded-[2px] border-[2px] border-white mr-2 flex flex-col items-center justify-center"></div>
                        <span className="text-white text-[0.95rem] font-inter font-[500]">share as work</span>
                    </div>
                </div>
            )
        case 'Work':
            return (
                <div className="w-full h-full flex flex-col items-center justify-start">
                    <div className="min-h-[60px] w-full flex items-center justify-start pl-5 box-border gap-x-2">
                        <div className="min-w-[45px] min-h-[45px] rounded-full bg-white bg-no-repeat bg-center bg-cover "></div>
                        <span className="text-white text-[1rem] font-inter font-[500]">Amal Raj</span>
                    </div>
                    <textarea placeholder='share your thoughts..' style={{ resize: 'none' }} className='w-full min-h-[30px] text-white text-[0.9rem] font-inter focus:outline-none bg-transparent pl-5 pt-2' />
                    <JobDropdown selectedWorkRole={selectedWorkRole} setSelectedWorkRole={setselectedWorkRole} className='self-start ml-[5%] mb-3' />
                    <div className="w-[80%] lg:w-[75%] h-[50%] max-h-[250px] rounded-[10px] border-[1px] border-primaryBorder flex items-center p-[10px] box-border">
                        <div className="relative w-full h-full rounded-[5px] bg-media flex flex-col items-center justify-center">
                            {/* <Add onClick={() => setPostType('Ordinary')} color='white' size={26} className='absolute z-[1000] top-[2%] right-[1%] cursor-pointer rotate-45' /> */}
                            <div className="min-h-[40px] min-w-[40px] rounded-full bg-lightGrey flex flex-col items-center justify-center ">
                                <GalleryAdd variant='Bold' color='white' size={26} />
                            </div>
                            <span className="text-white text-[1.1rem] font-inter font-[700] mt-1">Add Photo/Video</span>
                            <span className="text-white_half_opacity text-[0.9rem] font-inter font-[500]">drag and drop to add file</span>
                            <input type="file" name="" id="" className='absolute top-0 border-2 bottom-0 m-auto h-full w-full cursor-pointer opacity-0' />
                        </div>
                    </div>
                </div>
            )
        default:
            return (
                <div className="w-full h-full flex flex-col items-center justify-start">
                    <div className="min-h-[60px] w-full flex items-center justify-start pl-5 box-border gap-x-2">
                        <div className="min-w-[45px] min-h-[45px] rounded-full bg-white bg-no-repeat bg-center bg-cover "></div>
                        <span className="text-white text-[1rem] font-inter font-[500]">Amal Raj</span>
                    </div>
                    <textarea placeholder='share your thoughts..' style={{ resize: 'none' }} className='w-full h-full text-white text-[0.9rem] font-inter bg-transparent pl-5 pt-2 focus:outline-none' />
                </div>
            )
    }
}

export default CreatePostModal