import { useAppUiStore } from "@/store/app";
import Head from "next/head";
import React from "react";

export default function AuthPage() {
  
  return (
    <div className="w-screen h-screen flex items-center bg-greyBG justify-center  lg:px-0 box-border">
      <Head>
        <title>DevsUI</title>
        <meta name="description" content="create, connect, share" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-full h-full bg-black flex items-center justify-between">
        <section className=""></section>
      </section>
    </div>
  );
}
