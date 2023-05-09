import Axios from '@/config/AxiosConfig'
import { Users } from '@/constants/Types'
import { useAppUiStore } from '@/store/app'
import React, { useContext, useEffect } from 'react'
import { useAccount } from 'wagmi'

type Context = {
  login:() => Promise<void>
}

const appContext = React.createContext<Context>({} as Context)

const AppContextProvider = ({children}:{children:React.ReactNode}) => {
  const {user,setUser} = useAppUiStore()
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
            });
          } else {
            setUser({} as Users);
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