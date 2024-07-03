import { TransactionMessage, VersionedTransaction, Connection, PublicKey} from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";

const burn = async (provider, amount) => { 
  if (!provider) return

  try {

    const NETWORK = "https://solana-mainnet.g.alchemy.com/v2/tAVgt_oYxsFttt0jPbqNDBug1CYH2IRy";
    const connection = new Connection(NETWORK);
    const pubKey = "Jims6zroBMoTkCkMygsNZz5m24XCYaH9KcAcLLLu81j";
    const MINT_ADDRESS = 'CrkmpA8dx8UXFsRpXd3MD9MJ7r8qkk1U7SZeYHBeY7Px';
    const TRANSFER_AMOUNT = amount;

    let blockhash = await connection.getLatestBlockhash().then((res) => res.blockhash);

    let sourceAccount = await getAssociatedTokenAddress(
        new PublicKey(MINT_ADDRESS),
        provider.publicKey
    );

    let destinationAccount = await getAssociatedTokenAddress(
        new PublicKey(MINT_ADDRESS),
        new PublicKey(pubKey)
    );

    const instructions = [
    createTransferInstruction(
        sourceAccount,
        destinationAccount,
        provider.publicKey,
        TRANSFER_AMOUNT
    )
    ];
    // create v0 compatible message
    const messageV0 = new TransactionMessage({
      payerKey: provider.publicKey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message();
    
    // make a versioned transaction
    const transactionV0 = new VersionedTransaction(messageV0);

    const { signature } = await provider.signAndSendTransaction(transactionV0);
    const signatureStatus = await connection.getSignatureStatus(signature);

    console.log(signatureStatus);

    if (signatureStatus?.err) {
      // toast.error("Payment Failed")
      return false
    }
    else {
      // toast.success("Payment Successful")
      return true
    }
  }
  catch (error) {
    console.log(error)
  }
}

export default burn;