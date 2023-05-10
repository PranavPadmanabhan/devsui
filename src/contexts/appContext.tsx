import Axios from '@/config/AxiosConfig'
import { Users } from '@/constants/Types'
import { useAppUiStore } from '@/store/app'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useAccount } from 'wagmi'

type Context = {
  login:() => Promise<void>
}

const appContext = React.createContext<Context>({} as Context)

const AppContextProvider = ({children}:{children:React.ReactNode}) => {
  const {user,setUser} = useAppUiStore()
  const router = useRouter()
    const {address} = useAccount()
    const login = async () => {
        try {
          const res = await Axios.post("/auth/signin", {
            walletaddress: address,
          });
          const data = await res.data;
          if (data.walletAddress) {
            setUser({
              email: data.email,
              name: data.name,
              userName: data.userName,
              walletAddress: data.walletAddress,
              bio:data?.bio??null,
              coverImage:data?.coverImage?? null,
              dob:data?.dob??null,
              profileImage:data?.profileimage??null,
              role:data?.role??null
            });
            if(!data.role && router.pathname !== "/complete"){
              router.replace("/complete")
            }
          }
           else {
            setUser({} as Users);
            router.replace("/")
          }
    
        } catch (error) {
        }
      };

    const value = { login }

    
  return (
    <appContext.Provider value={value}>
        {children}
    </appContext.Provider>
  )
}

export default AppContextProvider

export const useAppContext:() => Context = () => useContext(appContext)