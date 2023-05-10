import Post from "@/components/post/Post";
import MainLayout from "@/layouts/MainLayout";
import SearchPanel from "@/components/home/SearchPanel";
import Head from "next/head";
import ProfileSuggestionItem from "@/components/home/ProfileSuggestionItem";
import React, { useEffect } from "react";
import { Add } from "iconsax-react";
import NavBar from "@/components/shared/NavBar";
import { useAppContext } from "@/contexts/appContext";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export default function Home() {

  const { login } = useAppContext()
  const { isConnected,address } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if( isConnected && address){
      login()
    }
    else {
      router.replace("/")
    }
  }, [isConnected,address])
  

  return (
    <MainLayout>
      <div className="w-screen h-screen flex items-center justify-start px-[2%] lg:px-0 box-border">
        <Head>
          <title>DevsUI | HOME</title>
          <meta name="description" content="create, connect, share" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="w-full lg:w-[65%] max-w-[550px] mx-0 lg:mx-[2%] h-full lg:h-[95%] flex flex-col items-center justify-start pb-[60px] lg:pb-0 box-border">
          <NavBar />
          <SearchPanel />
          <div className="mt-2 w-full lg:w-[98%] h-full flex flex-col items-center justify-start overflow-y-scroll scrollbar-hide rounded-[10px] ">
            <Post
              creatorName="Athul Vishnu"
              userName="athulvishnu"
              role="Designer"
              content={`Hey there We're hiring! Join our team as a software developer and help us build innovative solutions that make a difference in people's lives.`}
              image="https://imgs.search.brave.com/DstdE0diubtZKHMYNvCr7GvOhd1aSF_ge2h8bUp6NH4/rs:fit:1200:1156:1/g:ce/aHR0cHM6Ly9kb3du/bG9hZHBzZC5jYy93/cC1jb250ZW50L3Vw/bG9hZHMvQm9sZC1D/b2xvci1GbGF0LVdl/Yi1VSS1FbGVtZW50/cy1LaXQucG5n"
              subject="is Searching for an efficient Designer"
              comments={[{ comment: "dmkslkd" }]}
              likes={3}
            />
            <Post
              creatorName="Rahul Mohan"
              userName="rahulmohan"
              role="Developer"
              content={`Hey there We're hiring! Join our team as a software developer and help us build innovative solutions that make a difference in people's lives.`}
              image="https://imgs.search.brave.com/hkXkKx5h--XgseaurYDNRPmUA0D95MZ_Uuso-xfz7vI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzEzLzZh/LzBiLzEzNmEwYjY1/NzEyNjA2MDUyNGVm/YmViMTc2OTlkYjlj/LnBuZw"
              subject="is Searching for an efficient Developer"
              comments={[]}
              likes={0}
            />
            <Post
              creatorName="Amal Raj"
              userName="amalraj"
              role="Developer"
              content={`Hey there We're hiring! Join our team as a software developer and help us build innovative solutions that make a difference in people's lives.`}
              comments={[]}
              likes={0}
            />
            <Post
              creatorName="Sharath "
              userName="sharath"
              role="Developer"
              content={`Hey there We're hiring! Join our team as a software developer and help us build innovative solutions that make a difference in people's lives.`}
              image="https://imgs.search.brave.com/aNUAD9lIUVepWtHL4W_sNKeKwsRVOzv9e7rzYty4S_w/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzIzOTkx/MDIvc2NyZWVuc2hv/dHMvMTM4NjkyOTgv/Y2hhdGludGVyZmFj/ZS1kcmliYmJsZV80/eC5wbmc"
              subject="is Searching for an efficient Developer"
              comments={[]}
              likes={0}
            />
          </div>
        </section>
        <section className="w-[35%] h-[95%] max-w-[260px] hidden lg:flex  flex-col items-center justify-start">
          <div className="w-full min-h-[50%] bg-searchBG border-[1px] border-primaryBorder rounded-[15px] flex flex-col items-center justify-start box-border">
            <h1 className="self-start text-white text-[1.3rem] font-[600] font-inter my-2 ml-3">
              Suggestions
            </h1>
            <div
              className={`w-full h-full flex flex-col items-center justify-start`}
            >
              <ProfileSuggestionItem
                name="Athul Vishnu"
                userName="athulvishnu"
              />
              <ProfileSuggestionItem name="Rahul Mohan" userName="rahulmohan" />
              <ProfileSuggestionItem name="Pranav" userName="pranav" />
              <span className="self-end text-[1rem] text-transparent bg-clip-text bg-gradient-to-tr from-primaryGradient2 to-primaryGradient1 font-inter font-[700] mr-3 tracking-tight cursor-pointer">
                See more
              </span>
            </div>
          </div>
          <div className="relative w-full h-[25%] min-h-[70px] max-h-[80px] bg-warmingBlockBG rounded-[10px] border-[1px] border-primaryBorder flex flex-col items-start justify-start my-3 pt-[2%] pl-3 box-border">
            <Add
              color="white"
              size={24}
              className="absolute top-1 right-1 rotate-45"
            />
            <span className="text-white font-inter font-[500] text-[1.1rem] mb-1">
              Alpha Warning
            </span>
            <p className="text-white font-inter font-[300] text-[0.7rem]">
              DevsUi is still in the alpha phase,things may break,please handle
              us with care.{" "}
            </p>
          </div>
          <p className="text-[0.9rem] text-white_half_opacity font-inter font-[500] mt-3">
            <span className="mx-5">About</span>
            <span className="">Help Center</span>
          </p>
          <p className="text-[0.9rem] text-white_half_opacity font-inter font-[500]">
            <span className="mx-2">Privacy & Terms</span>
            <span className="">Get the DevsUI app</span>
          </p>
          <p className="text-[0.9rem] text-white_half_opacity font-inter font-[500]">
            DevsUi © 2023
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
