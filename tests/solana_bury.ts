import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaBury } from "../target/types/solana_bury";
import { Keypair,
         PublicKey,
         SystemProgram,
         clusterApiUrl,
         Connection,
         LAMPORTS_PER_SOL
       } from "@solana/web3.js";

describe("solana_bury", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaBury as Program<SolanaBury>;
  const connection = new Connection("http://127.0.0.1:8899", "confirmed");
  const tester_pubkey = new PublicKey("2G1FuUFXviRVr4FX8H8eZtR2WmVBAdFxnUWrxBJDMGvp")

  // it("Is initialized!", async () => {
  //   // Add your test here.
  //   const tx = await program.methods.initialize().rpc();
  //   console.log("Your transaction signature", tx);
  // });

  it("test bury", async () => {
    // 測試埋葬指令
    let txHash;
    let gameDateAccount;

    const [bennu_tombstone_account] =
      PublicKey.findProgramAddressSync([
        Buffer.from("solana_bury", "utf8")
        // Buffer.from("Bennu", "utf8"),
        // tester_pubkey.toBuffer()
        ],
        program.programId
      );
    console.log(bennu_tombstone_account)
    txHash = await program.methods
      .bury()
      .accounts({
        tombstone_account: bennu_tombstone_account,
        celebrant: tester_pubkey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    await logTransaction(txHash);
    async function logTransaction(txHash) {
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature: txHash,
        });
    }
  });

  // it("test worship", async () => {
  //   // 測試祭拜指令

  //   async function logTransaction(txHash) {
  //     const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  //     await connection.confirmTransaction({
  //         blockhash,
  //         lastValidBlockHeight,
  //         signature: txHash,
  //       });
  //   }
  // });


});
