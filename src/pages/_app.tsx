import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import AppContextProvider from "@/contexts/appContext";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

export default function App({ Component, pageProps }: AppProps) {
  const activeChainId = ChainId.Mumbai;

  const { chains, provider } = configureChains(
    [polygon, polygonMumbai],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ThirdwebProvider
          clientId={process.env.NEXT_PUBLIC_CLIENT_ID!} // You can get a client id from dashboard settings
          activeChain="mumbai"
          autoConnect
        >
          <AppContextProvider>
            <Component {...pageProps} />
          </AppContextProvider>
        </ThirdwebProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
