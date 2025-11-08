import React, { useMemo, useState, useEffect, createContext } from "react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,            
} from "@solana/wallet-adapter-wallets";

import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";


import "@solana/wallet-adapter-react-ui/styles.css";

export const ClusterContext = createContext({
  cluster: import.meta.env.VITE_SOLANA_CLUSTER || "devnet",
  setCluster: () => {},
});

export const WalletProviderRoot = ({ children }) => {
  const [cluster, setCluster] = useState(
    import.meta.env.VITE_SOLANA_CLUSTER || "devnet"
  );

  const endpoint = useMemo(() => {
    const envUrl = import.meta.env.VITE_SOLANA_RPC_URL;
    return envUrl || clusterApiUrl(cluster);
  }, [cluster]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
    ],
    []
  );
  

  const commitment = import.meta.env.VITE_SOLANA_COMMITMENT || "confirmed";

  // pre-connect once
  useEffect(() => {
    new Connection(endpoint, { commitment });
  }, [endpoint, commitment]);

  return (
    <ClusterContext.Provider value={{ cluster, setCluster }}>
      <ConnectionProvider endpoint={endpoint} config={{ commitment }}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ClusterContext.Provider>
  );
};
