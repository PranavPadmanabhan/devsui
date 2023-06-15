import { useAppUiStore } from "@/store/app";
import {
  Add,
  Briefcase,
  CalendarEdit,
  Gallery,
  GalleryAdd,
  Magicpen,
} from "iconsax-react";
import React, { useState } from "react";
import { ChevronRoght } from "../icons";
import { PostType } from "@/constants/Types";
import JobDropdown from "@/components/dropdowns/JobDropdown";
import NavBar from "@/components/shared/NavBar";
import BottomTabBar from "@/components/shared/BottomTabBar";
import { useAppContext } from "@/contexts/appContext";
import Axios from "@/config/AxiosConfig";
import { useAccount } from "wagmi";
import { BsCheckLg } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

const CreatePostModal = () => {
  const {
    setIsCreatePostModalVisible,
    postType,
    setPostType,
    selectedWorkRole,
    user
  } = useAppUiStore();
  const { posts, setPosts, isFreelance, setIsFreelance } = useAppContext();
  const { address, isConnected } = useAccount();
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const createPost = async () => {
    if (isConnected && address && user?.walletAddress) {
      let body: any = {};

      try {
        setLoading(true);
        if (postType === "Ordinary") {
          body = {
            content,
            type: postType,
            walletaddress: user?.walletAddress,
          };
        } else if (postType === "Media") {
          body = {
            content,
            type: postType,
            images,
            walletaddress: user?.walletAddress,
          };
        } else if (postType === "Work") {
          body = {
            content,
            type: postType,
            walletaddress: user?.walletAddress,
          };
        } else if (postType === "Event") {
          body = {
            content,
            type: postType,
            images,
            walletaddress: user?.walletAddress,
            jobRole: selectedWorkRole,
          };
        } else if (isFreelance) {
          body = {
            content,
            type: postType,
            walletaddress: user?.walletAddress,
            images,
          };
        }

        const res = await Axios.post("/posts", body);
        const data = await res.data;
        setPosts(data);
        setLoading(false);
        setContent("")
        setIsCreatePostModalVisible(false)
        setImages([])
      } catch (error) {
        setLoading(false);
        setIsCreatePostModalVisible(false)
        setContent("")
        setImages([])
      }
    } else {
      alert("Connect Wallet!!");
    }
  };

  return (
    <div className="fixed z-[1000] top-0 w-screen h-screen bg-black lg:bg-modalContainerBG backdrop-blur-0 lg:backdrop-blur-[10px] flex flex-col items-center justify-start lg:justify-center">
      <NavBar />
      <div className="w-full h-[90%]  max-h-full max-w-full rounded-[3px] lg:w-[70%] lg:h-[80%] lg:max-h-[500px] lg:max-w-[450px] lg:rounded-[25px] bg-modalBG border-[1px] border-primaryBorder overflow-hidden flex flex-col items-center justify-between">
        <div className="relative w-full h-[10%] max-h-[50px] border-b-[1px] border-b-primaryBorder flex items-center justify-center mb-2">
          <span className="text-white text-[1.3rem] font-inter font-[500]">
            Create Post
          </span>
          <Add
            onClick={() => setIsCreatePostModalVisible(false)}
            color="white"
            size={26}
            className="absolute top-[15%] right-[2%] cursor-pointer rotate-45"
          />
        </div>
        <RenderPostTypes
          postType={postType}
          isFreelance={isFreelance}
          setIsFreelance={setIsFreelance}
          content={content}
          setContent={setContent}
          user={user}
        />
        <div className="w-[87%] min-h-[50px] rounded-[30px] border-[1px] border-primaryBorder flex items-center justify-between pl-[2%] pr-[4px] box-border mb-3 mt-2">
          <span className="text-[0.8rem] lg:text-[0.9rem] text-white_half_opacity font-inter font-[400]">
            Add your post
          </span>
          <div className="w-[67%] lg:w-[55%] h-full flex items-center justify-between">
            <PostType
              onClick={() => setPostType("Ordinary")}
              Icon={Magicpen}
              iconColor="#14D3DB"
              isActive={postType === "Ordinary"}
            />
            <PostType
              onClick={() => setPostType("Media")}
              Icon={Gallery}
              iconColor="#34CA00"
              isActive={postType === "Media"}
            />
            <PostType
              onClick={() => setPostType("Work")}
              Icon={Briefcase}
              iconColor="#FFF50A"
              isActive={postType === "Work"}
            />
            <PostType
              onClick={() => setPostType("Event")}
              Icon={CalendarEdit}
              iconColor="#F94284"
              isActive={postType === "Event"}
            />
            <button onClick={createPost} className="min-h-[38px] min-w-[38px] rounded-full bg-gradient-to-tr from-primaryGradient2 to-primaryGradient1 flex items-center justify-center ">
              {loading ? (
                <ImSpinner2
                  color="white"
                  size={22}
                  className="animate-rotate"
                />
              ) : (
                <ChevronRoght className="scale-[0.8] ml-[5%]" />
              )}
            </button>
          </div>
        </div>
      </div>
      <BottomTabBar type="relative" />
    </div>
  );
};

const PostType = ({
  Icon,
  iconColor,
  onClick,
  isActive,
}: {
  Icon: any;
  iconColor: string;
  onClick?: () => void;
  isActive: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={`min-w-[38px] min-h-[38px] rounded-full flex items-center justify-center ${
        isActive ? "bg-postTypeActive" : "bg-transparent"
      } cursor-pointer`}
    >
      <Icon variant="Bold" color={iconColor} size={24} />
    </div>
  );
};

const RenderPostTypes = ({
  postType,
  isFreelance,
  setIsFreelance,
  content,
  setContent,
  user
}: {
  postType: PostType;
  isFreelance: boolean;
  setIsFreelance: any;
  setContent: any;
  content: string;
  user:any
}) => {
  const { selectedWorkRole, setselectedWorkRole, setPostType } =
    useAppUiStore();
  let jobList = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Flutter Developer",
    "IOS Developer",
    "ReactJS Developer",
    "React Native Developer",
    "AngularJS Developer",
    "Angular Developer",
    "UI/UX Designer",
    "UI/UX Analyst",
  ];

  switch (postType) {
    case "Ordinary":
      return (
        <div className="w-full h-full flex flex-col items-center justify-start">
          <div className="min-h-[60px] w-full flex items-center justify-start pl-5 box-border gap-x-2">
            <div style={{backgroundImage : `url(${user?.profileImage})`}} className="min-w-[45px] min-h-[45px] rounded-full bg-white bg-no-repeat bg-center bg-cover "></div>
            <span className="text-white text-[1rem] font-inter font-[500]">
              {user?.name}
            </span>
          </div>
          <textarea
            placeholder="share your thoughts.."
            style={{ resize: "none" }}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="w-full h-full text-white text-[0.9rem] font-inter bg-transparent px-5 pt-2 focus:outline-none"
          />
        </div>
      );
    case "Media":
      return (
        <div className="w-full h-full flex flex-col items-center justify-start">
          <div className="min-h-[60px] w-full flex items-center justify-start px-5 box-border gap-x-2">
            <div style={{backgroundImage : `url(${user?.profileImage})`}} className="min-w-[45px] min-h-[45px] rounded-full bg-white bg-no-repeat bg-center bg-cover "></div>
            <span className="text-white text-[1rem] font-inter font-[500]">
              {user?.name}
            </span>
          </div>
          <textarea
            placeholder="share your thoughts.."
            style={{ resize: "none" }}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="w-full min-h-[60px]  text-white text-[0.9rem] font-inter focus:outline-none bg-transparent px-5 pt-2"
          />
          <div className="w-[80%] lg:w-[75%] h-[50%] max-h-[250px] rounded-[10px] border-[1px] border-primaryBorder flex items-center p-[10px] box-border">
            <div className="relative w-full h-full rounded-[5px] bg-media flex flex-col items-center justify-center">
              {/* <Add onClick={() => setPostType('Ordinary')} color='white' size={26} className='absolute z-[1000] top-[2%] right-[1%] cursor-pointer rotate-45' /> */}
              <div className="min-h-[40px] min-w-[40px] rounded-full bg-lightGrey flex flex-col items-center justify-center ">
                <GalleryAdd variant="Bold" color="white" size={26} />
              </div>
              <span className="text-white text-[1.1rem] font-inter font-[700] mt-1">
                Add Photo/Video
              </span>
              <span className="text-white_half_opacity text-[0.9rem] font-inter font-[500]">
                drag and drop to add file
              </span>
              <input
                type="file"
                name=""
                id=""
                className="absolute top-0 border-2 bottom-0 m-auto h-full w-full cursor-pointer opacity-0"
              />
            </div>
          </div>
          <div className="min-h-[20px] w-full flex items-center justify-start my-2 pl-[14%] box-border">
            <div
              onClick={() => setIsFreelance(!isFreelance)}
              className={`min-h-[18px] min-w-[18px] rounded-[2px] border-[2px] ${
                isFreelance
                  ? "border-blue-500 bg-blue-500"
                  : "border-white bg-transparent"
              } mr-2 flex flex-col items-center justify-center`}
            >
              {isFreelance && <BsCheckLg color="white" size={16} />}
            </div>
            <span className="text-white text-[0.95rem] font-inter font-[500]">
              share as work
            </span>
          </div>
        </div>
      );
    case "Work":
      return (
        <div className="w-full h-full flex flex-col items-center justify-start">
          <div className="min-h-[60px] w-full flex items-center justify-start px-5 box-border gap-x-2">
            <div style={{backgroundImage : `url(${user?.profileImage})`}} className="min-w-[45px] min-h-[45px] rounded-full bg-white bg-no-repeat bg-center bg-cover "></div>
            <span className="text-white text-[1rem] font-inter font-[500]">
              {user?.name}
            </span>
          </div>
          <textarea
            placeholder="share your thoughts.."
            style={{ resize: "none" }}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="w-full min-h-[30px] text-white text-[0.9rem] font-inter focus:outline-none bg-transparent px-5 pt-2"
          />
          <JobDropdown
            placeholder="Select Job role"
            list={jobList}
            selectedWorkRole={selectedWorkRole}
            setSelectedWorkRole={setselectedWorkRole}
            className="self-start ml-[5%] mb-3 max-w-[240px]"
          />
          <div className="w-[80%] lg:w-[75%] h-[50%] max-h-[250px] rounded-[10px] border-[1px] border-primaryBorder flex items-center p-[10px] box-border">
            <div className="relative w-full h-full rounded-[5px] bg-media flex flex-col items-center justify-center">
              {/* <Add onClick={() => setPostType('Ordinary')} color='white' size={26} className='absolute z-[1000] top-[2%] right-[1%] cursor-pointer rotate-45' /> */}
              <div className="min-h-[40px] min-w-[40px] rounded-full bg-lightGrey flex flex-col items-center justify-center ">
                <GalleryAdd variant="Bold" color="white" size={26} />
              </div>
              <span className="text-white text-[1.1rem] font-inter font-[700] mt-1">
                Add Photo/Video
              </span>
              <span className="text-white_half_opacity text-[0.9rem] font-inter font-[500]">
                drag and drop to add file
              </span>
              <input
                type="file"
                name=""
                id=""
                className="absolute top-0 border-2 bottom-0 m-auto h-full w-full cursor-pointer opacity-0"
              />
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full h-full flex flex-col items-center justify-start">
          <div className="min-h-[60px] w-full flex items-center justify-start px-5 box-border gap-x-2">
            <div style={{backgroundImage : `url(${user?.profileImage})`}} className="min-w-[45px] min-h-[45px] rounded-full bg-white bg-no-repeat bg-center bg-cover "></div>
            <span className="text-white text-[1rem] font-inter font-[500]">
              {user?.name}
            </span>
          </div>
          <textarea
            placeholder="share your thoughts.."
            style={{ resize: "none" }}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="w-full h-full text-white text-[0.9rem] font-inter bg-transparent pl-5 pt-2 focus:outline-none"
          />
        </div>
      );
  }
};

export default CreatePostModal;
