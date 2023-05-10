/* eslint-disable react-hooks/exhaustive-deps */
import Message from "@/components/messages/Message";
import MessageBox from "@/components/messages/MessageBox";
import MessageComposer from "@/components/messages/MessageComposer";
import MessageHeader from "@/components/messages/MessageHeader";
import Search from "@/components/messages/Search";
import Axios from "@/config/AxiosConfig";
import MainLayout from "@/layouts/MainLayout";
import { useAppUiStore } from "@/store/app";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useAccount } from "wagmi";
import { FaPlus } from "react-icons/fa";
import { useAppContext } from "@/contexts/appContext";
import { ImSpinner2 } from "react-icons/im";

type Loading = {
  sending: boolean;
  creating: boolean;
  gettingConversations:boolean
};

type Error = {
  creationError: string;
};

const Messages = () => {
  const { address, isConnected } = useAccount();
  const { user, setUser } = useAppUiStore();
  const { login } = useAppContext();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<Loading>({
    sending: false,
    creating: false,
    gettingConversations:false
  });
  const [conversations, setConversations] = useState<any[]>([]);
  const [Activeconversation, setActiveConversation] = useState<any>({});
  const [error, setError] = useState<Error>({ creationError: "" });
  const [keyWord, setKeyWord] = useState<string>("");
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");


  const getConversations = async () => {
    try {
      if (isConnected && address) {
        if (user?.name === undefined) {
          const name = localStorage.getItem("name");
          setUser({ ...user, name: name! });
        }
        setLoading({ ...loading, gettingConversations: true });
          const name = localStorage.getItem("name");
          const res = await Axios.get(
            `/conversations/${address}?name=${user?.name??name}`
          );
          const data = await res.data;
          if (data.length > 0&& data !== conversations) {
            setConversations(data);
          } else {
            setConversations([]);
          }
          setLoading({ ...loading, gettingConversations: false });
      } else {
        router.replace("/");
        alert("connect wallet");
      }
    } catch (error: any) {}
  };


  const getMessages = async () => {
    try {
      if (isConnected && address) {
        setInterval(async () => {
          const name = localStorage.getItem("name");
          const res = await Axios.get(
            `/conversations/${address}?name=${user?.name??name}`
          );
          const data = await res.data;
          if (data.length > 0&& data !== conversations) {
            setConversations(data);
          } else {
            setConversations([]);
          }
        }, 2000);
      } else {
        router.replace("/");
        alert("connect wallet");
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    if(user.name !== undefined){
      localStorage.setItem("name", user?.name!);
    }
    getConversations().finally(() => {
      getMessages()
    });
    return () => {
      setMessages([]);
    };
  }, []);

  useEffect(() => {
    const index = localStorage.getItem("activeChatIndex");
    const i = parseInt(index!);
    setActiveConversation(conversations[i]);
  }, [conversations]);

  useEffect(() => {
    if (address && Object.keys(user).length < 2) {
      login();
      console.log(user?.profileImage)
    } else if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, address]);

  const sendMessage = async (conversationId: string) => {
    try {
      if (isConnected && address) {
        setLoading({ ...loading, sending: true });
        const res = await Axios.post(`/messages/${conversationId}`, {
          walletaddress: address,
          message,
        });
        const data = await res.data;
        console.log(data)
        if (data) {
          setActiveConversation(data);
          setMessage("");
        }
        setLoading({ ...loading, sending: false });
      } else {
        router.replace("/");
        alert("connect wallet");
      }
    } catch (error: any) {
      setLoading({ ...loading, sending: false });
    }
  };

  const createConversation = async () => {
    if (address && walletAddress.trim().length !== 0) {
      try {
        setLoading({ ...loading, creating: true });
        const res = await Axios.post("/conversations", {
          walletaddress: address,
          receiver: walletAddress,
        });
        const data = await res.data;
        console.log(data)
        if (data.error) {
          setError({ ...error, creationError: data.error });
        } else {
          setError({ ...error, creationError: "" });
          setConversations(data);
          setAddModalVisible(false)
        }
        setLoading({ ...loading, creating: false });

      } catch (error) {
        setLoading({ ...loading, creating: false });

      }
    }
  };

  return (
    <MainLayout>
      <div className="w-full h-[95%] flex items-center justify-start px-[2%]  bg-black  box-border ">
        <div className="w-full h-full flex items-center justify-start rounded-[30px] border-[1px] border-primaryBorder lg:p-[0.8rem] box-border">
          <div className="w-[35%] h-full bg-secondaryBG flex flex-col items-center justify-start rounded-[20px] border-[1px] border-primaryBorder pb-3 mr-0 lg:mr-[2%] ">
            <h1 className="self-start mt-[2%] ml-[5%] text-white font-inter text-[1.5rem] font-[500]">
              Messages
            </h1>
            <div className="flex items-center justify-between w-full h-auto pr-2 box-border">
              <Search
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                onAdd={() => setAddModalVisible(!addModalVisible)}
              />
            </div>
            {addModalVisible && (
              <div className="w-full h-auto flex items-center justify-between min-h-[45px] mb-2 px-2 box-border">
                <input
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="address"
                  type="text"
                  className="w-[76%] h-[95%] bg-transparent rounded-[5px] border-[1px] border-primaryBorder pl-2 box-border focus:outline-none text-white text-[0.8rem]"
                />
                <button
                  onClick={createConversation}
                  className="w-[22%] h-[95%] rounded-[5px] bg-white_half_opacity  flex items-center justify-center"
                >
                  {loading.creating ? (
                    <ImSpinner2
                      color="white"
                      size={22}
                      className="animate-rotate"
                    />
                  ) : (
                   <h1 className="text-white text-[0.9rem]">Add</h1>
                  )}
                </button>
              </div>
            )}
            <div className={`w-full h-[95%] rounded-[10px] flex flex-col items-center ${loading.gettingConversations?'justify-center':'justify-start'} overflow-y-scroll box-border scrollbar-hide`}>
              {conversations.map((conversation: any, i: number) => {
                const name = conversation?.members?.filter(
                  (item: any) => item.address !== address
                )[0]?.name;
                const lastMessage =
                  conversation?.messages?.length > 0
                    ? `${conversation.messages[
                        conversation.messages.length - 1
                      ].message.slice(0, 10)}...`
                    : "";
                return (
                  <MessageBox
                    onClick={() => {
                      if (window) {
                        localStorage.setItem("activeChatIndex", i.toString());
                      }
                      setActiveConversation(conversation);
                    }}
                    key={i}
                    name={name}
                    lastMessage={lastMessage}
                    isActive={Activeconversation === conversation}
                  />
                );
              }).reverse()}
              {
                loading.gettingConversations && <ImSpinner2
                color="white"
                size={32}
                className="animate-rotate"
              />
              }
            </div>
          </div>
          <div className="w-[65%] h-full flex flex-col items-center justify-between border-[1px] bg-secondaryBG border-primaryBorder rounded-[20px]">
            <MessageHeader
              name={
                Activeconversation?.members?.filter(
                  (item: any) => item.address !== address
                )[0]?.name
              }
            />
            <InfiniteScroll
              className="w-full h-full flex flex-col-reverse items-center justify-start overflow-y-scroll scrollbar-hide px-2 pb-2 box-border"
              pageStart={0}
              loadMore={() => null}
              hasMore={false}
              loader={
                <div className="text-white" key={0}>
                  Loading ...
                </div>
              }
              useWindow={false}
              isReverse
            >
              {Activeconversation?.messages
                ?.map((item: any, i: number) => (
                  <Message
                    key={i}
                    timestamp={item.timestamp}
                    isSentByUser={
                      item.sender.toLowerCase() === address?.toLowerCase()
                    }
                    content={item.message}
                  />
                ))
                .reverse()}
                <div />
            </InfiniteScroll>
            <MessageComposer
              isSending={loading.sending}
              onChangeEmoji={(e: any) => setMessage((prev) => prev + e.emoji)}
              onChange={(e: any) => setMessage(e.target.value)}
              value={message}
              onSubmit={() => sendMessage(Activeconversation?.conversationId)}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
