import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { initMetaplex, mintBadgeNFT } from "../lib/metaplex";
import { toast } from "sonner";

export const BadgeMintButton = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    if (!wallet.connected) return toast.error("Connect your wallet first!");
    setLoading(true);
    try {
      const metaplex = initMetaplex(connection, wallet);
      const imageUri = "https://arweave.net/your_badge_metadata.json"; // placeholder metadata link
      const nft = await mintBadgeNFT(metaplex, {
        name: "DEVETA Completion Badge",
        description: "Awarded for completing your first learning module!",
        imageUri,
      });
      toast.success(`Badge minted: ${nft.name}`);
    } catch (e) {
      toast.error("Mint failed.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMint}
      disabled={loading}
      className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50"
    >
      {loading ? "Minting..." : "Mint My Badge 🏅"}
    </button>
  );
};

