"use client"

import { useState } from "react";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import {
    connection,
    commitmentLevel,
    jimboRumbleProgramId,
    jimboRumbleProgramInterface,
} from "../../utils/solana-utils/constants";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export default async function useCreateMaster() {
    const [masterAccount, _] = useState(Keypair.generate());
    const wallet = useAnchorWallet();

    if (!wallet) return;

    const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: commitmentLevel,
    });

    let master;

    if (!provider) return;

    const program = new Program(
        jimboRumbleProgramInterface,
        jimboRumbleProgramId,
        provider
    );

    try {
        const txn = await program.rpc.initMaster({
            accounts: {
                master: masterAccount.publicKey,
                payer: provider.wallet.publicKey,
                systemProgram: web3.SystemProgram.programId,
            },
            signers: [masterAccount],
        });

        master = await program.account.master.fetch(
            masterAccount.publicKey
        );

    } catch (err) {
        console.log("Transaction error: ", err);
        master = null;
    }

    return {master}
};

