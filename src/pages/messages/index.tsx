import Message from "@/components/messages/Message";
import MessageBox from "@/components/messages/MessageBox";
import MessageComposer from "@/components/messages/MessageComposer";
import MessageHeader from "@/components/messages/MessageHeader";
import Search from "@/components/messages/Search";
import Axios from "@/config/AxiosConfig";
import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useAccount } from "wagmi";

type Loading = {
  sending: boolean;
};

const Messages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<Loading>({ sending: false });
  const { address, isConnected } = useAccount();

  const getMessages = async () => {
    try {
      if (isConnected && address) {
        setInterval(async () => {
          const res = await Axios.get(
            "/conversations/0x9E858403796D2CC5e7aC3520828Bb9597B272cfF"
          );
          const data = await res.data;
          if (messages !== data[0].messages) {
            setMessages(data[0].messages);
          }
        }, 2000);
      } else {
        alert("connect wallet");
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    getMessages();

    return () => {
      setMessages([]);
    };
  }, []);

  const sendMessage = async () => {
    try {
      if (isConnected && address) {
        setLoading({ ...loading, sending: true });
        const res = await Axios.post(
          "/messages/1ed21d4e-d3ea-4c83-82c0-3c20a2c0f24d",
          {
            walletaddress: address,
            message,
          }
        );
        const data = await res.data;
        if (data) {
          setMessages(data[0].messages);
          setMessage("");
        }
        setLoading({ ...loading, sending: false });
      } else {
        alert("connect wallet");
      }
    } catch (error: any) {
      setLoading({ ...loading, sending: false });
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
            <Search />
            <div className="w-full h-[95%] rounded-[10px] flex flex-col items-center justify-start overflow-y-scroll box-border scrollbar-hide">
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
            </div>
          </div>
          <div className="w-[65%] h-full flex flex-col items-center justify-between border-[1px] bg-secondaryBG border-primaryBorder rounded-[20px]">
            <MessageHeader />
            <InfiniteScroll
              className="w-full h-full flex flex-col-reverse items-center justify-start px-2 pb-2 box-border"
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
              {messages
                .map((item, i) => (
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
            </InfiniteScroll>
            <MessageComposer
              isSending={loading.sending}
              onChangeEmoji={(e: any) => setMessage((prev) => prev + e.emoji)}
              onChange={(e: any) => setMessage(e.target.value)}
              value={message}
              onSubmit={sendMessage}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
