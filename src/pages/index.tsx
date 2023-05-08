import Input from "@/components/auth/Input";
import { LogoBig } from "@/components/core/icons";
import { Wallet2 } from "iconsax-react";
import Head from "next/head";
import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import { useAccount } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { emailRegex, usernameRegex } from "@/constants/constants";
import Axios from "@/config/AxiosConfig";
import dynamic from "next/dynamic";

type state = {
  name: string;
  email: string;
  userName: string;
};

type Error = {
  userNameError: string;
  nameError: string;
};

type Loading = {
  checkingUsername: boolean;
};
function AuthPage() {
  const [state, setState] = useState<state>({
    email: "",
    name: "",
    userName: "",
  });
  const [error, setError] = useState<Error>({
    userNameError: "",
    nameError: "",
  });
  const [loading, setLoading] = useState<Loading>({ checkingUsername: false });
  const { address, isConnected } = useAccount();
  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();

  return (
    <div className="w-screen h-screen flex items-center bg-greyBG justify-center  lg:px-0 box-border">
      <Head>
        <title>DevsUI</title>
        <meta name="description" content="create, connect, share" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-full h-full bg-black flex items-center justify-between">
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
          <div className=" w-[70%] h-[75%] max-h-[500px] flex  flex-col items-center -ml-[4vw] justify-center ">
            <div className="w-[80%] h-auto flex flex-col items-start justify-start">
              <Input
                classNames={{ wrapper: "w-full" }}
                value={state.name}
                onChange={(e) => {
                  setState({ ...state, name: e.target.value });
                  if (e.target.value.length <= 3) {
                    setError({ ...error, nameError: "Invalid Name" });
                  } else {
                    setError({ ...error, nameError: "" });
                  }
                }}
                placeholder="Name"
                state={state.name.trim().length === 0?'normal':state.name.length<=3?'error':'success'}
              />
              
            </div>
            <div className="w-[80%] h-auto flex flex-col items-start justify-start">
              <Input
                classNames={{ wrapper: "my-7 w-full" }}
                value={state.userName}
                isLoading={loading.checkingUsername}
                onChange={async (e) => {
                  try {
                    setState({ ...state, userName: e.target.value });
                    if (usernameRegex.test(e.target.value)) {
                      setError({
                        ...error,
                        userNameError:
                          "Username doesnot contain capital letters",
                      });
                    } else {
                      setError({ ...error, userNameError: "" });
                    }
                    setLoading({ ...loading, checkingUsername: true });
                    const res = await Axios.get(
                      `/auth/users/${e.target.value.toLowerCase()}`
                    );
                    const data = await res.data;
                    if (data.error) {
                      setError({
                        ...error,
                        userNameError: data.error.toLowerCase(),
                      });
                    } else {
                      setError({ ...error, userNameError: "" });
                    }
                    setLoading({ ...loading, checkingUsername: false });
                  } catch (error) {}
                }}
                placeholder="UserName"
                state={
                  state.userName.trim().length === 0 || loading.checkingUsername
                    ? "normal"
                    : error.userNameError.trim().length !== 0 ||
                      usernameRegex.test(state.userName)
                    ? "error"
                    : "success"
                }
              />
              <h1
                className={`self-start text-[0.8rem] text-red-700 font-[700] font-inter -mt-6  h-[20px] w-full`}
              >
                {error.userNameError}
              </h1>
            </div>
            <Input
              value={state.email}
              classNames={{ wrapper: "w-[80%]" }}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              placeholder="Email"
              state={
                state.email.trim().length === 0
                  ? "normal"
                  : emailRegex.test(state.email)
                  ? "success"
                  : "error"
              }
            />
            <button className="underline font-inter font-[500] text-white text-[1,2rem] my-8 self-center ">
              Create & Connect
            </button>
            <div className="w-full h-[1px] bg-white_half_opacity my-7"></div>
            <button
              onClick={isConnected ? openAccountModal : openConnectModal}
              className={`${styles.connectButton} w-[60%] min-h-[45px] rounded-[10px] max-w-[220px] bg-gradient-to-r bg-primaryGradient2 to-primaryGradient1 p-[2px] box-border flex items-center justify-center mt-3`}
            >
              <div
                className={`${styles.inset} h-full w-full rounded-[8px] bg-black flex items-center justify-center`}
              >
                <Wallet2 color="#0057FF" size={24} />
                {isConnected ? (
                  <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primaryGradient2 to-primaryGradient1 text-[1rem] font-[500] font-inter ml-2 ">
                    0x..{address?.slice(address.length - 10, address.length)}
                  </h1>
                ) : (
                  <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primaryGradient2 to-primaryGradient1 text-[1rem] font-[500] font-inter ml-2 ">
                    Connect Wallet
                  </h1>
                )}
              </div>
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default dynamic(() => Promise.resolve(AuthPage), { ssr: false });
