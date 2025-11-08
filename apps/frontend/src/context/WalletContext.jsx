import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(250);

  const addTokens = (amount) => setBalance((b) => b + amount);
  const spendTokens = (amount) => setBalance((b) => Math.max(0, b - amount));

  return (
    <WalletContext.Provider value={{ balance, addTokens, spendTokens }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
