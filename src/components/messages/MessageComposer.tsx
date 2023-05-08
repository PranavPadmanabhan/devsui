import React, { useState } from 'react'
import { ChevronRoght } from '../core/icons'
import EmojiPicker from 'emoji-picker-react';
import { EmojiHappy } from 'iconsax-react';
import {ImSpinner10 } from 'react-icons/im'


const MessageComposer = ({ onChange, onSubmit, value,onChangeEmoji,isSending }: { onChange: any; value: string; onSubmit: () => void; onChangeEmoji:any;isSending:boolean }) => {
    const [isEmojiPickerShown, setIsEmojiPickerShown] = useState<boolean>(false)
    return (
        <div className='relative w-full h-[10%] min-h-[60px] max-h-[70px] border-t-[1px] flex items-center justify-center border-t-primaryBorder'>
            <form onSubmit={(e) => {
                e.preventDefault()
                setIsEmojiPickerShown(false)
                onSubmit()
            }} className="w-[95%] min-h-[45px] rounded-[30px] border-[1px] border-primaryBorder flex items-center justify-between pr-[4px] box-border">
                <input value={value} onFocus={() => setIsEmojiPickerShown(false)} onChange={onChange} placeholder='send message..' type="text" className="w-full min-h-[40px] bg-transparent pl-[5%] focus:outline-none text-white text-[0.9rem] placeholder:text-[0.9rem] placeholder:text-white_half_opacity " />
                <div className="flex items-center justify-evenly w-auto h-full">
                    {isEmojiPickerShown && <div className="absolute bottom-[100%] right-[20%] flex items-center justify-end">
                        <EmojiPicker onEmojiClick={onChangeEmoji} />
                    </div>}
                    <EmojiHappy
                        onClick={() => setIsEmojiPickerShown(!isEmojiPickerShown)}
                        size="30"
                        color="rgba(255,255,255,0.1)"
                        className='mr-4 cursor-pointer'
                    />
                    <button className="min-h-[35px] min-w-[35px] rounded-full bg-gradient-to-tr from-primaryGradient2 to-primaryGradient1 flex items-center justify-center ">
                        {isSending?(<ImSpinner10 color='white' size={22} className='animate-rotate' />):(<ChevronRoght className='scale-[0.8] ml-[5%]' />)}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageComposer