// Client
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TinyAdventure } from "../target/types/tiny_adventure";
import { Keypair,
         PublicKey,
         SystemProgram,
         clusterApiUrl,
         Connection,
         LAMPORTS_PER_SOL
       } from "@solana/web3.js";
// import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
describe("tiny_adventure", () => {

  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.TinyAdventure as Program<TinyAdventure>;
  const connection = new Connection("http://127.0.0.1:8899", "confirmed");
  // const wallet = Keypair.generate();
  const player_pubkey = new PublicKey("2G1FuUFXviRVr4FX8H8eZtR2WmVBAdFxnUWrxBJDMGvp")
  
  it("my test!", async () => {
    // Add your test here.
    const airdropTransactionSignature = await connection.requestAirdrop(
      // wallet.publicKey,
      player_pubkey,
      LAMPORTS_PER_SOL,
    );
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature: airdropTransactionSignature,
    });
    
    // The PDA adress everyone will be able to control the character if the interact with your program
    const [globalLevel1GameDataAccount] =
      PublicKey.findProgramAddressSync(
        [Buffer.from("level1", "utf8")],
        program.programId
      );

    let txHash;
    let gameDateAccount;
    try {
      gameDateAccount = await program.account.gameDataAccount.fetch(
        globalLevel1GameDataAccount
      );
    } catch {
      txHash = await program.methods
      .initialize()
      .accounts({
        newGameDataAccount: globalLevel1GameDataAccount,
        // signer: wallet.publicKey,
        signer: player_pubkey,
        systemProgram: SystemProgram.programId,
      })
      // .signers([wallet.keypair])
      .rpc();

      await logTransaction(txHash);
      console.log("A journey begins...");
      console.log("o........");
    }
    
    txHash = await program.methods
    // .moveLeft()
    .moveRight()
    .accounts({
      gameDataAccount: globalLevel1GameDataAccount,
    })
    // .signers([wallet.keypair])
    .rpc();
    await logTransaction(txHash);

    gameDateAccount = await program.account.gameDataAccount.fetch(
      globalLevel1GameDataAccount
    );

    console.log("Player position is:", gameDateAccount.playerPosition.toString());

    switch (gameDateAccount.playerPosition) {
      case 0:
        console.log("A journey begins...");
        console.log("o........");
        break;
      case 1:
        console.log("....o....");
        break;
      case 2:
        console.log("......o..");
        break;
      case 3:
        console.log(".........\\o/");
        break;
    }

    async function logTransaction(txHash) {
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature: txHash,
        });

    }

  });
});

