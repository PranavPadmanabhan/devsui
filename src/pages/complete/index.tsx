/* eslint-disable react-hooks/exhaustive-deps */
import { LogoBig } from "@/components/core/icons";
import { GalleryAdd } from "iconsax-react";
import Head from "next/head";
import React, { Dispatch, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { ImSpinner2 } from "react-icons/im";
import { useAppUiStore } from "@/store/app";
import JobDropdown from "@/components/dropdowns/JobDropdown";
import { useAppContext } from "@/contexts/appContext";
import { useAccount } from "wagmi";
import Axios from "@/config/AxiosConfig";
import { useRouter } from "next/router";

type state = {
  bio: string;
  dob: string;
};

type Loading = {
  coverImageUploading: boolean;
  profileImageUploading: boolean;
  updating:boolean
};



const Complete = () => {
  const storage = new ThirdwebStorage();
  const { user,setUser } = useAppUiStore()
  const { login } = useAppContext()
  const router = useRouter()
  const { isConnected,address } = useAccount()
  const [state, setState] = useState<state>({
    bio:'',
    dob: "",
  });
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState<Loading>({
    coverImageUploading: false,
    profileImageUploading: false,
    updating:false
  });

  useEffect(() => {
    if(address){
      login()
    }
  }, [isConnected,address])
  

  const uploadImage = async (image: any, set: "cover" | "profile") => {
    try {
      const uploaded = await storage.upload(image, {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true,
      });

      if (set === "cover") {
        setLoading({ ...loading, coverImageUploading: true });

        const res = await Axios.put(`/auth/user/${address}`,{
          coverImage:uploaded
        })
        const data = await res.data;
        if(data.walletAddress){
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
          })
        }

        setLoading({ ...loading, coverImageUploading: false });
      } else {
        setLoading({ ...loading, profileImageUploading: true });
        const res = await Axios.put(`/auth/user/${address}`,{
          profileImage:uploaded
        })
        const data = await res.data;
        if(data.walletAddress){
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
          })
        }

        setLoading({ ...loading, profileImageUploading: false });
      }
    } catch (error) {
      if (set === "cover") {
        setLoading({ ...loading, coverImageUploading: false });
      } else {
        setLoading({ ...loading, profileImageUploading: false });
      }
    }
  };

  const updateDetails = async(e:any) => {
    e.preventDefault()
   if(
    role.trim().length !== 0&& 
    state.bio.trim().length !== 0 && 
    state.dob.trim().length !== 0
   ){
    try {
      setLoading({ ...loading, updating: true });
      const res = await Axios.put(`/auth/user/${address}`,{
        bio:state.bio,
        dob:state.dob,
        role:role
      })
      const data = await res.data;
      if(data.walletAddress){
        setUser({
          email: data.email,
          name: data.name,
          userName: data.userName,
          walletAddress: data.walletAddress,
          bio:data?.bio??null,
          coverImage:data?.coverImage?? null,
          dob:data?.dob??null,
          profileImage:data?.profileImage??null,
          role:data?.role??null
        })
        router.replace("/home")
      }

      setLoading({ ...loading, updating: false });
    } catch (error) {
      
    }
   }
  }

  return (
    <div className="w-screen h-screen flex items-center bg-greyBG justify-center  lg:px-0 box-border">
      <Head>
        <title>DevsUI</title>
        <meta name="description" content="create, connect, share" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-full h-full bg-black flex items-center justify-between  lg1400:max-h-[700px]  xl1400:max-w-[78%] xl1500:max-w-[74%] xl1600:max-w-[69%] xl1700:max-w-[65%] xl1800:max-w-[62%] xl1900:max-w-[58%]">
        <section className="w-1/2 h-full flex flex-col items-center justify-center bg-slate-950 bg-signuCover bg-center bg-cover bg-no-repeat">
          <div className="w-full h-full flex flex-col items-center justify-center backdrop-blur-[25px]">
            <LogoBig />
            <h1 className="text-white font-averia text-[5vw] font-[700] -mt-[3%] -mb-3">
              DevsUi
            </h1>
            <h1 className="text-white font-averia text-[2vw] font-[700]">
              Create,Connect,Share
            </h1>
          </div>
        </section>
        <section className="w-1/2 h-full flex flex-col items-center  justify-center">
          <form onSubmit={updateDetails} className="w-[80%] h-[80%] max-w-[700px] max-h-[700px] flex flex-col items-center justify-start">
            <h1 className="text-white text-[2vw] font-inter font-[700] self-start mb-2">
              Upload Info
            </h1>
            <div
              style={{ backgroundImage: `url(${user?.coverImage!})` }}
              className="cursor-pointer relative  w-full self-start h-[30%] bg-modalBG rounded-[10px] min-h-[150px] max-h-[180px] border-[1px] border-primaryBorder flex flex-col items-center justify-center bg-no-repeat bg-center bg-cover"
            >
              {!user?.coverImage && !loading.coverImageUploading && (
                <>
                  <div className="min-w-[50px] min-h-[50px] rounded-full bg-lightGrey flex items-center justify-center mb-1">
                    <GalleryAdd color="white" size={25} variant="Bold" />
                  </div>
                  <h1 className="text-[1.2rem] text-white_half_opacity font-oswald font-bold">
                    upload cover image
                  </h1>
                </>
              )}
              {loading.coverImageUploading && (
                <ImSpinner2
                  color="white"
                  size={22}
                  className="absolute left-0 right-0 top-0 bottom-0 m-auto animate-rotate"
                />
              )}
              <input
                accept="image/*"
                onChange={(e) => {
                  if (!e.target.files) {
                    return;
                  }
                  else uploadImage(e.target.files[0], "cover");
                }}
                type="file"
                name=""
                id=""
                className="opacity-0 cursor-pointer z-[100] absolute w-full h-full"
              />
              <div
                className={`${styles.profileCircle} cursor-pointer absolute left-[20px] min-w-[120px] min-h-[120px] rounded-full bg-modalBG border-[5px] border-black flex items-center justify-center  overflow-hidden`}
              >
                <div
                  style={{ backgroundImage: `url(${user?.profileImage!})` }}
                  className="relative min-w-[120px] min-h-[120px] rounded-full bg-transparent flex items-center justify-center bg-no-repeat bg-center bg-cover"
                >
                  {!user?.profileImage &&
                    !loading.coverImageUploading && (
                      <h1 className="text-[0.8rem] text-white_half_opacity font-inter font-[300] max-w-[80%] text-center">
                        upload
                        <br /> profile image
                      </h1>
                    )}
                  {loading.profileImageUploading && (
                    <ImSpinner2
                      color="white"
                      size={22}
                      className="absolute left-0 right-0 top-0 bottom-0 m-auto animate-rotate"
                    />
                  )}
                  <input
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files) {
                        return;
                      }
                      else uploadImage(e.target.files[0], "profile");
                    }}
                    type="file"
                    name=""
                    id=""
                    className="opacity-0 cursor-pointer z-[1000] absolute w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="w-full min-h-[60px] flex flex-col items-start justify-start pt-[2px] pl-[160px] box-border ">
              <h1 className="text-white font-inter text-[1.1rem] font-[700]">{user?.name} </h1>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primaryGradient2 to-primaryGradient1 font-inter text-[0.85rem] font-[400]">@{user?.userName} </h1>
            </div>
            <textarea onChange={(e) => setState({...state,bio:e.target.value})} style={{resize:'none'}} className="self-start mt-[20px] pt-9 px-3 box-border w-full min-h-[90px] h-[20%] max-h-[110px] bg-modalBG rounded-[10px] border-[1px] border-primaryBorder focus:outline-none text-white text-[1rem] " placeholder="Bio" name="" id="" cols={30} rows={10}></textarea>
            <div className="self-start w-full h-auto flex items-center justify-between mt-2">
              <JobDropdown placeholder="Select Role" list={[
                "Designer",
                "Developer",
                "Both"
              ]} selectedWorkRole={role} setSelectedWorkRole={setRole} className="bg-modalBG w-[45%]" />
              <input onChange={(e) => setState({...state,dob:e.target.value})} placeholder="Date of birth (DD/MM/YYYY)" type="text" className="w-1/2 min-h-[45px] rounded-[10px] border-[1px] border-primaryBorder bg-modalBG pl-3 box-border focus:outline-none text-white text-[1rem] " />
            </div>
            <button onClick={updateDetails} className="min-w-[150px] min-h-[45px] rounded-[5px] bg-gradient-to-r from-primaryGradient1 to-primaryGradient2 mt-8 flex items-center justify-center">
            {loading.updating ? (
                    <ImSpinner2
                      color="white"
                      size={22}
                      className="animate-rotate"
                    />
                  ) : (
                   <h1 className="text-white text-[0.9rem]">Update</h1>
                  )}
            </button>
          </form>
        </section>
      </section>
    </div>
  );
};

export default Complete;
