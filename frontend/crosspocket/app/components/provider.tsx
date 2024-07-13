"use client";
import { WagmiProvider } from 'wagmi'
import { config } from '../utils/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from "react";

const queryClient = new QueryClient();

export function Provider({ children }:{ children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}