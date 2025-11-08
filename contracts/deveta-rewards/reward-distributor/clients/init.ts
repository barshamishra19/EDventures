import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";

(async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const PROGRAM_ID = new PublicKey("EgaF7X38Rr8YSzkvfxVCyTwsWEKuLVgCiQUxwj4NjvoF");
  const EDC_MINT = new PublicKey("5u9gqeRi3vBdfskNaA6YW7tmhtnMjYB7zLKxJssVmQ64");

  const idl = await anchor.Program.fetchIdl(PROGRAM_ID, provider);
  const program = new anchor.Program({ idl, programId: PROGRAM_ID, provider });

  const state = anchor.web3.Keypair.generate();
  const [vaultAuthority] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), state.publicKey.toBuffer()],
    PROGRAM_ID
  );

  const vaultEdcAta = await getAssociatedTokenAddress(EDC_MINT, vaultAuthority, true);

  console.log("🪙 EDC Mint:", EDC_MINT.toBase58());
  console.log("📦 State Pubkey:", state.publicKey.toBase58());
  console.log("🔐 Vault Authority:", vaultAuthority.toBase58());
  console.log("🏦 Vault EDC ATA:", vaultEdcAta.toBase58());

  const tx = await program.methods.initialize().accounts({
    state: state.publicKey,
    edcMint: EDC_MINT,
    vaultAuthority,
    vaultEdcAta,
    admin: provider.wallet.publicKey,
    systemProgram: anchor.web3.SystemProgram.programId,
    tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
    associatedTokenProgram: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
  }).signers([state]).rpc();

  console.log("✅ Initialization Tx:", tx);
})();
