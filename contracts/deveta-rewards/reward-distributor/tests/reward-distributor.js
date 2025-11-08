const anchor = require("@coral-xyz/anchor");
const { PublicKey } = anchor.web3;

// your deployed program ID here
const PROGRAM_ID = new PublicKey("EgaF7X38Rr8YSzkvfxVCyTwsWEKuLVgCiQUxwj4NjvoF");

describe("reward-distributor", () => {
  const provider = new anchor.AnchorProvider(
    new anchor.web3.Connection("https://api.devnet.solana.com", "confirmed"),
    anchor.AnchorProvider.env().wallet,
    { commitment: "confirmed" }
  );
  anchor.setProvider(provider);

  it("Initializes successfully!", async () => {
    const program = new anchor.Program(
      require("../target/idl/reward_distributor.js").IDL,
      PROGRAM_ID,
      provider
    );

    const state = anchor.web3.Keypair.generate();

    const tx = await program.methods.initialize().accounts({
      state: state.publicKey,
      edcMint: new PublicKey("5u9gqeRi3vBdfskNaA6YW7tmhtnMjYB7zLKxJssVmQ64"),
      vaultAuthority: anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), state.publicKey.toBuffer()],
        PROGRAM_ID
      )[0],
      vaultEdcAta: new PublicKey("<VAULT_EDC_ATA>"), // optional for test only
      admin: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      associatedTokenProgram: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    }).signers([state]).rpc();

    console.log("✅ Devnet transaction:", tx);
  });
});
