import ModalsContainer from '@/components/core/modals/ModalsContainer'
import BottomTabBar from '@/components/shared/BottomTabBar'
import Sidebar from '@/components/shared/Sidebar'
import Axios from '@/config/AxiosConfig'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { address } = useAccount()
  const updateStatus = async(status:boolean) => {
    try {
      const res = await Axios.put(`auth/user/${address}`,{
        isOnline:status
      })
      const data = await res.data
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if(router.pathname.includes("messages")){
      updateStatus(true)
    }
    else {
      updateStatus(false)
    }
  },[router.pathname])

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-black ">
      <div className='w-full h-full flex items-center justify-center lg:pb-0 lg1100:max-w-[90%] lg1200:max-w-[88%] lg1300:max-w-[80%] xl1400:max-w-[78%] xl1500:max-w-[74%] xl1600:max-w-[69%] xl1700:max-w-[65%] xl1800:max-w-[62%] xl1900:max-w-[58%] box-border'>
         <Sidebar />
        {children}
         <BottomTabBar type='fixed' />
      </div>
      <ModalsContainer />
    </div>
  )
}

export default MainLayout