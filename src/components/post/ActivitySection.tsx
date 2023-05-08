import React, { Dispatch, SetStateAction } from 'react'
import ActivitySectionItem from './ActivitySectionItem'
import { CommentIcon, Like, ShareIcon } from '../core/icons'
import { PostInteractionType, PostType } from '@/constants/Types'

const ActivitySection = ({ postType, setActiveSection, activeSection }: { postType: PostType, setActiveSection: Dispatch<SetStateAction<PostInteractionType>>; activeSection: PostInteractionType }) => {
    const [isLiked, setIsLiked] = React.useState<boolean>(false)

    return (
        <div className='w-full min-h-[40px] flex flex-col items-center justify-between px-[3%] box-border'>
            <div className="w-[75%] min-h-[1px] bg-primaryBorder"></div>
            <div className="w-full h-[40px] my-2 flex items-center justify-between">
                <div className="w-[70%] h-full flex items-center justify-between">
                    <ActivitySectionItem onClick={() => setIsLiked(!isLiked)} isLiked={isLiked} Icon={Like} title={isLiked ? 'Liked' : 'Like'} />
                    <ActivitySectionItem onClick={() => setActiveSection(activeSection === 'Comment' ? null : 'Comment')} Icon={CommentIcon} title='Comment' />
                    <ActivitySectionItem Icon={ShareIcon} title='Share' />
                </div>
                {
                    postType === "Work" && (
                        <button onClick={() => setActiveSection(activeSection === 'Requests' ? null : 'Requests')} className='w-[100px] h-[35px] lg:w-[140px] lg:h-[40px] rounded-[5px] lg:rounded-[10px] p-[1px] box-border overflow-hidden bg-gradient-to-tr from-primaryGradient1 to-primaryGradient2 '>
                            <div className="w-full h-full rounded-[4px] lg:rounded-[9px] bg-secondaryBG flex items-center justify-center">
                                <h1 className="text-[0.8rem] lg:text-[1rem] text-transparent bg-clip-text font-[700] bg-gradient-to-tr from-primaryGradient1 to-primaryGradient2 ">Request Work</h1>
                            </div>
                        </button>
                    )
                }
            </div>
            <div className="w-[75%] min-h-[1px] bg-primaryBorder"></div>
        </div>
    )
}

export default ActivitySection