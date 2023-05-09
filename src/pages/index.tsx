/* eslint-disable react-hooks/exhaustive-deps */
import Input from "@/components/auth/Input";
import { LogoBig } from "@/components/core/icons";
import { Wallet2, User, UserOctagon, Sms } from "iconsax-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { useAccount, useConnect } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { emailRegex, usernameRegex } from "@/constants/constants";
import Axios from "@/config/AxiosConfig";
import dynamic from "next/dynamic";
import { useAppUiStore } from "@/store/app";
import { Users } from "@/constants/Types";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/router";

type state = {
  name: string;
  email: string;
  userName: string;
};

type Error = {
  name: string;
  email: string;
  userName: string;
};

type Loading = {
  checkingUsername: boolean;
  signingUp: boolean;
  signingIn:boolean
};
function AuthPage() {
  const router = useRouter();
  const [state, setState] = useState<state>({
    email: "",
    name: "",
    userName: "",
  });
  const [error, setError] = useState<Error>({
    userName: "",
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState<Loading>({
    checkingUsername: false,
    signingUp: false,
    signingIn:false
  });
  const { setUser } = useAppUiStore();
  const { address, isConnected } = useAccount();
  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();
  const { connect, connectors } = useConnect();

  const signup = async () => {
    if (
      state.name.trim().length !== 0 &&
      state.email.trim().length !== 0 &&
      state.userName.trim().length !== 0
    ) {
      try {
        if (window.ethereum) {
          if (isConnected) {
            setLoading({ ...loading, signingUp: true });
            const res = await Axios.post("/auth/signup", {
              name: state.name,
              email: state.email,
              username: state.userName,
              walletaddress: address,
            });
            const data = await res.data;
            console.log(data);
            if (data.walletAddress) {
              setUser({
                email: data.email,
                name: data.name,
                userName: data.userName,
                walletAddress: data.walletAddress,
              });
              router.replace("/home");
            } else {
              setUser({} as Users);
            }
            setLoading({ ...loading, signingUp: false });
          } else {
            alert("Please connect wallet");
          }
        } else {
          alert("crypto wallet is required");
        }
      } catch (error) {
        setLoading({ ...loading, signingUp: false });
      }
    } else {
      if (
        state.name.trim().length === 0 &&
        state.email.trim().length === 0 &&
        state.userName.trim().length === 0
      ) {
        setError({
          name: "name is required",
          email: "email is required",
          userName: "username is required",
        });
      } else if (
        state.email.trim().length === 0 &&
        state.name.trim().length === 0
      ) {
        setError({
          name: "name is required",
          email: "email is required",
          userName: "",
        });
      } else if (
        state.email.trim().length === 0 &&
        state.userName.trim().length === 0
      ) {
        setError({
          name: "",
          email: "email is required",
          userName: "username is required",
        });
      } else if (
        state.name.trim().length === 0 &&
        state.userName.trim().length === 0
      ) {
        setError({
          name: "name is required",
          email: "",
          userName: "username is required",
        });
      } else if (state.name.trim().length === 0) {
        setError({
          name: "name is required",
          email: "",
          userName: "",
        });
      } else if (state.userName.trim().length === 0) {
        setError({
          name: "",
          email: "",
          userName: "username is required",
        });
      } else {
        setError({
          name: "",
          email: "email is required",
          userName: "",
        });
      }
    }
  };

  const login = async () => {
    try {
      setLoading({ ...loading, signingIn: true });
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
        router.replace("/home");
      } else {
        setUser({} as Users);
      }
      setLoading({ ...loading, signingIn: false });

    } catch (error) {
      setLoading({ ...loading, signingIn: false });
    }
  };

  useEffect(() => {
    if (address) {
      login();
    }
  }, [isConnected, address]);

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
                PrefixIcon={User}
                onChange={(e) => {
                  setState({ ...state, name: e.target.value });
                  if (e.target.value.trim().length == 0) {
                    setError({ ...error, name: "" });
                  } else if (e.target.value.length <= 3) {
                    setError({ ...error, name: "Invalid Name" });
                  } else {
                    setError({ ...error, name: "" });
                  }
                }}
                placeholder="Name"
                state={
                  state.name.trim().length === 0
                    ? "normal"
                    : state.name.length <= 3
                    ? "error"
                    : "success"
                }
              />
              <h1
                className={`self-start text-[0.8rem] text-red-700 font-[700] font-inter h-[20px] w-full`}
              >
                {error.name}
              </h1>
            </div>
            <div className="w-[80%] h-auto flex flex-col items-start my-3 justify-start">
              <Input
                classNames={{ wrapper: "w-full" }}
                value={state.userName}
                PrefixIcon={UserOctagon}
                isLoading={loading.checkingUsername}
                onChange={async (e) => {
                  try {
                    setState({ ...state, userName: e.target.value });
                    if (!usernameRegex.test(e.target.value)) {
                      setError({
                        ...error,
                        userName: "Invalid username",
                      });
                    } else {
                      setError({ ...error, userName: "" });
                    }
                    setLoading({ ...loading, checkingUsername: true });
                    if (e.target.value.trim().length !== 0) {
                      const res = await Axios.get(
                        `/auth/users/${e.target.value.toLowerCase()}`
                      );
                      const data = await res.data;
                      if (data.error) {
                        setError({
                          ...error,
                          userName: data.error.toLowerCase(),
                        });
                      } else {
                        setError({ ...error, userName: "" });
                      }
                    }
                    setLoading({ ...loading, checkingUsername: false });
                  } catch (error) {}
                }}
                placeholder="Username"
                state={
                  state.userName.trim().length === 0 || loading.checkingUsername
                    ? "normal"
                    : error.userName.trim().length !== 0 ||
                      !usernameRegex.test(state.userName)
                    ? "error"
                    : "success"
                }
              />
              <h1
                className={`self-start text-[0.8rem] text-red-700 font-[700] font-inter  h-[20px] w-full`}
              >
                {error.userName}
              </h1>
            </div>
            <div className="w-[80%] h-auto flex flex-col items-start justify-start">
              <Input
                value={state.email}
                PrefixIcon={Sms}
                classNames={{ wrapper: "w-full" }}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                  if (e.target.value.trim().length === 0) {
                    setError({ ...error, email: "" });
                  } else if (!emailRegex.test(e.target.value)) {
                    setError({ ...error, email: "Invalid email" });
                  } else {
                    setError({ ...error, email: "" });
                  }
                }}
                placeholder="Email"
                state={
                  state.email.trim().length === 0
                    ? "normal"
                    : emailRegex.test(state.email)
                    ? "success"
                    : "error"
                }
              />
              <h1
                className={`self-start text-[0.8rem] text-red-700 font-[700] font-inter h-[20px] w-full`}
              >
                {error.email}
              </h1>
            </div>
            <button
              onClick={signup}
              className="my-8 self-center flex items-center justify-center"
            >
              {loading.signingUp ? (
                <ImSpinner2
                  color="white"
                  size={24}
                  className="animate-rotate"
                />
              ) : (
                <h1 className="font-inter font-[500] text-white text-[1.2rem] underline ">
                  Create & Connect
                </h1>
              )}
            </button>
            <div className="w-full h-[1px] bg-white_half_opacity my-7"></div>
            <p className="text-white font-[500] font-inter text-[0.8rem] max-w-[65%] text-center ">
              Already have an account ? you only need connect your wallet to
              signin
            </p>
            <button
              onClick={isConnected ? openAccountModal : openConnectModal}
              className={`${styles.connectButton} w-[60%] min-h-[45px] rounded-[10px] max-w-[220px] bg-gradient-to-r bg-primaryGradient2 to-primaryGradient1 p-[2px] box-border flex items-center justify-center mt-3`}
            >
              <div
                className={`${styles.inset} h-full w-full rounded-[8px] bg-black flex items-center justify-center`}
              >
               {loading.signingIn?(
                 <ImSpinner2
                 color="#0057FF"
                 size={24}
                 className="animate-rotate"
               />
               ):(
                <>
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
                </>
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
