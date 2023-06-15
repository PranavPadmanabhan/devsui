/* eslint-disable @next/next/no-img-element */
import Post from "@/components/post/Post";
import MainLayout from "@/layouts/MainLayout";
import SearchPanel from "@/components/home/SearchPanel";
import Head from "next/head";
import ProfileSuggestionItem from "@/components/home/ProfileSuggestionItem";
import React, { useEffect, useState } from "react";
import { Add } from "iconsax-react";
import NavBar from "@/components/shared/NavBar";
import { useAppContext } from "@/contexts/appContext";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import Axios from "@/config/AxiosConfig";
import { PostType } from "@/constants/Types";
import Lottie from "lottie-react";
import animation from "../../../public/assets/gif/nodata.json";
import { ImSpinner2 } from "react-icons/im";

type Loading = {
  creatingPost: boolean;
  gettingPosts: boolean;
};

export default function Home() {
  const { login, posts, setPosts } = useAppContext();
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [loading, setLoading] = useState<Loading>({
    creatingPost: false,
    gettingPosts: false,
  });

  useEffect(() => {
    if (isConnected && address) {
      login();
    } else {
      router.replace("/");
    }
  }, [isConnected, address]);

  const getPosts = async () => {
    try {
      setLoading({ ...loading, gettingPosts: true });
      const res = await Axios.get("/posts");
      const data = await res.data;
      if (data?.length > 0) {
        setPosts(data
        );
      } else {
        setPosts([]);
      }
      setLoading({ ...loading, gettingPosts: false });
    } catch (error) {
      setLoading({ ...loading, gettingPosts: false });
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPostSubject = (type: any | PostType, jobRole: any) => {
    switch (type) {
      case "Ordinary":
        return "shared a Post";

      case "Media":
        return "shared a Post";
      case "Work":
        return `is searching for ${jobRole}`;
      case "Event":
        return "shared an Event";
      case "Freelance":
        return "shared a Freelance Job";
      default:
        return "shared a Post";
    }
  };


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
          <div
            className={`mt-2 w-full lg:w-[98%] h-full flex flex-col items-center ${
              posts.length <= 0 || loading.gettingPosts
                ? "justify-center"
                : "justify-start"
            } overflow-y-scroll scrollbar-hide rounded-[10px] `}
          >
            {posts
              ?.sort((a: any, b: any) => {
                if (a.createdAt > b.createdAt) {
                  return -1;
                } else {
                  return 1;
                }
              })
              .map((post, i) => {
                return (
                  <Post
                    key={i}
                    type={post?.type}
                    creatorName={post?.createdBy.name}
                    userName={post?.createdBy.userName}
                    profileImage={post?.createdBy?.profileimage}
                    role={post?.createdBy.role}
                    content={post?.content}
                    images={post?.images}
                    subject={getPostSubject(post?.type, post?.jobRole)}
                    comments={post.comments}
                    likes={post.likes}
                  />
                );
              })}
            {posts.length <= 0 && !loading.gettingPosts && (
              <Lottie animationData={animation} loop={true} />
            )}
            {loading.gettingPosts && (
              <ImSpinner2 color="white" size={26} className="animate-rotate" />
            )}
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
