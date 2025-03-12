import BN from 'bn.js';
import * as web3 from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
// import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import type { SolanaBury } from '../target/types/solana_bury';
import idl from '../target/idl/solana_bury.json' with { type: 'json' };
import express from 'express';
const app = express();
const port = 8080;

// connection
// const { connection } = useConnection();
// const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
const connection = new web3.Connection('http://127.0.0.1:8899', 'confirmed');

// wallet
// const wallet = useAnchorWallet();
const secret_key_array = [150,142,87,98,48,79,225,72,106,138,197,128,144,90,9,53,109,86,40,93,108,246,234,143,202,129,222,110,122,19,130,23,18,179,176,139,101,175,17,157,47,235,17,111,131,43,174,142,121,89,215,221,101,39,236,13,125,238,244,224,97,12,207,205];
const key_pair = web3.Keypair.fromSecretKey(Uint8Array.from(secret_key_array));
// 創建錢包
const wallet = {
  publicKey: key_pair.publicKey,
  signTransaction: (tx: web3.Transaction) => {
    tx.sign(key_pair);
    return tx;
  }
};

// provider
// const provider = anchor.AnchorProvider.env();
const provider = new anchor.AnchorProvider(connection, wallet, {});
anchor.setProvider(provider);

// program
const program = new anchor.Program(idl as SolanaBury, provider);

// const tester_pubkey = new web3.PublicKey("2G1FuUFXviRVr4FX8H8eZtR2WmVBAdFxnUWrxBJDMGvp");
const whose_tombstone = "Bennu"

// 定義路由
app.get('/', (req, res) => {
  res.send('Welcome to solana_bury project.');
});

app.get('/bury', async (req, res) => {
  // 測試埋葬指令
  let txHash;
  // 尋找墓碑pda位址
  const [bennu_tombstone_account] =
    web3.PublicKey.findProgramAddressSync([
      Buffer.from('solana_bury_tombstone', 'utf8'),
      Buffer.from('Bennu', 'utf8'),
      wallet.publicKey.toBuffer()
      ],
      program.programId
    );
  console.log(bennu_tombstone_account);
  // 呼叫埋葬指令
  txHash = await program.methods
    .bury(whose_tombstone)
    .accounts({
      tombstone_account: bennu_tombstone_account,
      celebrant: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([])
    .rpc();

  // 確認交易成功
  await logTransaction(txHash);
  res.send('bury some...');
});

app.get('/worship', async (req, res) => {
  // 測試祭拜指令
  let txHash;
  // 尋找祝詞pda位址
  const [bennu_blessings_account] =
    web3.PublicKey.findProgramAddressSync([
      Buffer.from('solana_bury_blessings', 'utf8'),
      Buffer.from('Bennu', 'utf8'),
      wallet.publicKey.toBuffer()
      ],
      program.programId
    );
  console.log(bennu_blessings_account);
  // 呼叫祭拜指令
  let offering_count = new BN(10);
  txHash = await program.methods
    .worship(whose_tombstone, 'R.I.P', offering_count)
    .accounts({
      blessings_account: bennu_blessings_account,
      worshipper: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([])
    .rpc();

  // 確認交易成功
  await logTransaction(txHash);
  res.send('worship some...');
});

async function logTransaction(txHash) {
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature: txHash,
  });
  console.log('solana confirm -v ', txHash);
}

// 啟動http服務
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
