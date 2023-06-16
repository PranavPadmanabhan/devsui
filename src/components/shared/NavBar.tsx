import { useAppUiStore } from '@/store/app'
import React from 'react'

const NavBar = () => {
  const { user } = useAppUiStore()
  return (
    <header className='w-full min-h-[45px] h-[10%] max-h-[60px] flex lg:hidden items-center justify-end px-[2%] box-border '>
      <div style={{backgroundImage:`url(${user?.profileImage})`}} className="min-h-[40px] min-w-[40px] rounded-full bg-white bg-center bg-no-repeat bg-cover "></div>
    </header>
  )
}

export default NavBar