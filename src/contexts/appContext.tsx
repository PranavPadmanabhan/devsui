import Axios from '@/config/AxiosConfig'
import { Users } from '@/constants/Types'
import { useAppUiStore } from '@/store/app'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

type Context = {
  login:() => Promise<void>
  conversations:any[];
  setConversations:React.Dispatch<React.SetStateAction<any[]>>
  posts:any[];
  setPosts:React.Dispatch<React.SetStateAction<any[]>>
  isFreelance:boolean;
  setIsFreelance:React.Dispatch<React.SetStateAction<boolean>>
}

const appContext = React.createContext<Context>({} as Context)

const AppContextProvider = ({children}:{children:React.ReactNode}) => {
  const {user,setUser} = useAppUiStore()
  const [conversations, setConversations] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [isFreelance, setIsFreelance] = useState<boolean>(false);


  const router = useRouter()
    const {address} = useAccount()
    const login = async () => {
        try {
          const res = await Axios.post("/auth/signin", {
            walletaddress: address,
          });
          const data = await res.data;
          

          if (
            data.walletAddress 
            ) {
            setUser({
              email: data.email,
              name: data.name,
              userName: data.userName,
              walletAddress: data.walletAddress,
              bio:data?.bio??null,
              coverImage:data?.coverImage?? null,
              dob:data?.DOB??null,
              profileImage:data?.profileimage??null,
              role:data?.role??null
          
            });
            if(!data.role && router.pathname !== "/complete"){
              router.replace("/complete")
            }
            else if(data.role && router.pathname === "/complete"){
              router.replace("/home")
            }
          
          }
          
           else {
            setUser({} as Users);
            router.replace("/")
          }
    
        } catch (error) {
        }
      };

    const value = { login,conversations,setConversations,posts,setPosts,isFreelance,setIsFreelance }

    
  return (
    <appContext.Provider value={value}>
        {children}
    </appContext.Provider>
  )
}

export default AppContextProvider

export const useAppContext:() => Context = () => useContext(appContext)