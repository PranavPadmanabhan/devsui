/* eslint-disable @next/next/no-img-element */
import { sideBarLinks } from '@/assets/links/sidebarLinks'
import { useAppUiStore } from '@/store/app';
import { useRouter } from 'next/router'
import React from 'react'

const Sidebar = () => {

    const router = useRouter();
    const { user } = useAppUiStore()

  return (
    <div className='hidden lg:w-[50%] lg1100:max-w-[250px] xl1500:max-w-[260px] xl1600:max-w-[270px] lg:h-[95%] lg:rounded-[30px] lg:flex lg:flex-col lg:items-center lg:justify-between lg:bg-primaryBG lg:border-[1px] lg:border-primaryBorder overflow-hidden pt-14 box-border'>
        <div className="w-full h-[40%] flex flex-col items-start justify-start bg-transparent">
            {
                sideBarLinks.map(({ id, label, path, icon:{ active:Active,normal:Normal } }) => (
                    <div onClick={() => router.push(path)} key={id} className=" h-[80px] w-full flex items-center justify-start my-2 pl-[10%] gap-x-4 box-border">
                        { router.pathname === path?<Active className='cursor-pointer' />:<Normal className='cursor-pointer'/> }
                        <h1 className={`${router.pathname=== path?'text-white cursor-pointer':'text-white_half_opacity'} font-inter font-[500] text-[1.2rem] cursor-pointer`}>{label}</h1>
                    </div>
                ))
            }
        </div>
        <div className="min-h-[70px] w-[90%] rounded-[25px] border-[1px] border-primaryBorder flex items-center justify-start gap-x-3 px-3 box-border mb-3">
            <img src={user?.profileImage!} alt="" className="min-w-[45px] min-h-[45px] border-[2px] p-[1px] box-border border-primaryBorder rounded-full" />
        <h1 className="text-white">{user?.name}</h1>
        </div>
    </div>
  )
}

export default Sidebar