"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { configureChains, mainnet, sepolia } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createConfig, WagmiConfig } from "wagmi";
import {darkTheme } from '@rainbow-me/rainbowkit';
import "@rainbow-me/rainbowkit/styles.css";
 


const inter = Inter({ subsets: ['latin'] })

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "Polling DAO",
  projectId: "d4a7d3c95d0d0200f8e7d62bf17cc43c",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} modalSize="compact" theme={darkTheme()}>    
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
        </body>
    </html>
  )
}
