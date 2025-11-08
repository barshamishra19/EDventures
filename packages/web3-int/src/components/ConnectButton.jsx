import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const ConnectButton = () => (
  <div className="[&>button]:rounded-xl! [&>button]:px-4! [&>button]:py-2!">
    <WalletMultiButton />
  </div>
);
