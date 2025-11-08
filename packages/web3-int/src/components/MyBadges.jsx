import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { initMetaplex, fetchUserNFTs } from "../lib/metaplex";

export const MyBadges = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      if (!wallet.connected) return;
      const metaplex = initMetaplex(connection, wallet);
      const userBadges = await fetchUserNFTs(metaplex, wallet.publicKey);
      setBadges(userBadges);
    };
    fetchBadges();
  }, [wallet.connected, connection]);

  if (!wallet.connected) return <p className="text-gray-500">Connect your wallet to view badges.</p>;

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold">My Badges 🪶</h3>
      {badges.length === 0 ? (
        <p className="text-gray-500">No badges found yet. Complete a course to earn one!</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((nft) => (
            <div
              key={nft.mintAddress.toBase58()}
              className="p-4 rounded-xl border bg-white shadow hover:shadow-md transition"
            >
              <img
                src={nft?.json?.image || "/placeholder.png"}
                alt={nft.name}
                className="rounded-lg w-full h-40 object-cover mb-3"
              />
              <h4 className="font-bold text-lg">{nft.name}</h4>
              <p className="text-sm text-gray-600">
                {nft?.json?.description || "DEVETA Achievement Badge"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
