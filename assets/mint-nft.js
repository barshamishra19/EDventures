import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import fs from "fs";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const wallet = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync("/Users/aryankarfa/.config/solana/devnet.json", "utf8")))
);

const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));

(async () => {
  const { nft } = await metaplex.nfts().create({
    name: "Achievement Badge",
    symbol: "ACH",
    uri: "https://arweave.net/6SPqYiLUTo7bz9fGQ2qYWdoGdrUKrjRzkB3kO-VX6hI", // sample metadata that exists
    sellerFeeBasisPoints: 0,
  });

  console.log("✅ NFT minted:", nft.address.toBase58());
})();
