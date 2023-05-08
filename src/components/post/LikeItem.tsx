import { Messages1, ProfileAdd } from 'iconsax-react'
import React from 'react'

const LikeItem = ({ name, userName, onMessage, onRequest, isConnected, onProfileVisit }: { name: string; userName: string; onMessage?: () => void; onProfileVisit?: () => void; onRequest?: () => void; isConnected: boolean }) => {
  return (
    <div className="w-full min-h-[30px] flex flex-col items-center justify-start">
      <div className='w-full min-h-[30px] flex items-center justify-between'>
        <div className="w-full h-full flex items-center justify-start ">
          <div onClick={onProfileVisit} className="min-w-[42px] min-h-[42px] rounded-full bg-white mr-4"></div>
          <div className="w-full h-full flex flex-col items-start justify-start pt-[1%] box-border">
            <span onClick={onProfileVisit} className="text-white font-[500] text-[0.9rem] lg:text-[1rem] font-inter ">{name}</span>
            <span className="text-[0.8rem] lg:text-[0.9rem] text-transparent bg-clip-text bg-gradient-to-tr from-primaryGradient2 to-primaryGradient1 font-inter font-[500] ">@{userName}</span>
          </div>
        </div>
        <div onClick={onMessage} className="min-w-[35px] min-h-[35px] lg:min-w-[40px] lg:min-h-[40px] rounded-full bg-search_button flex items-center justify-center cursor-pointer">
          {isConnected ? 
          <>
          <ProfileAdd className='flex lg:hidden' onClick={onRequest} color='white' size={20} />
          <ProfileAdd className='hidden lg:flex' onClick={onRequest} color='white' size={24} />
          </>
          : 
          <>
          <Messages1 className='hidden lg:flex' color='white' size={24} />
          <Messages1 className='flex lg:hidden' color='white' size={20} />
          </>
          }
        </div>
      </div>
      <div className="w-[80%] min-h-[1px] bg-primaryBorder mt-2"></div>
    </div>
  )
}

export default LikeItem