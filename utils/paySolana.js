import { TransactionMessage, VersionedTransaction, SystemProgram, Connection, PublicKey } from '@solana/web3.js';
import { toast } from "react-toastify"

const paySolana = async (provider, lamports, pubKey) => {
  if (!provider) return

  try {
    const NETWORK = "https://solana-mainnet.g.alchemy.com/v2/o-5MHzJ43DEJywRvsw-HkqSAA6c4CD51";
    const connection = new Connection(NETWORK);

    let blockhash = await connection.getLatestBlockhash().then((res) => res.blockhash);
    console.log(pubKey)
    const instructions = [
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: new PublicKey(pubKey),
        lamports: lamports,
      }),
    ];
    console.log("hello", provider.publicKey);
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
      toast.error("Payment Failed")
      return false
    }
    else {
      toast.success("Payment Successful")
      return true
    }
  }
  catch (error) {
    console.log(error)
  }
}

export default paySolana;