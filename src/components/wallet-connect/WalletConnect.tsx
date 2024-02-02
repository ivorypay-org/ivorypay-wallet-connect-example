import { Buffer } from "buffer";
//@ts-nocheck
import { useState } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Transaction } from "@solana/web3.js";
import { IvorypayClient } from "../../services/ivorypay-client";

require("@solana/wallet-adapter-react-ui/styles.css");

export type IWalletOptionModalProps = {
  txReference: string;
  onWalletConfirmation(disconnect: () => void): void;
};

const ivorypayClient = new IvorypayClient();

export const WalletConnect = ({
  txReference,
  onWalletConfirmation,
}: IWalletOptionModalProps) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, disconnect } = useWallet();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickPay = async () => {
    setIsLoading(true);
    try {
      // 0. Obtain the public key of the connected wallet.
      const walletPublicAddress = publicKey?.toBase58()!;

      // 1.0. Send the public key to the backend.
      let data = await ivorypayClient.payWithWalletConnect(
        txReference,
        walletPublicAddress
      );
      const serializedTnx = data.transactionHash; // This is actually a base64-encoded serialized transaction. Not a transaction hash.

      // 1. Convert the base64-encoded serialized transaction to a transaction object.
      const transaction = Transaction.from(
        Buffer.from(serializedTnx, "base64")
      );

      transaction.recentBlockhash = (
        await connection.getLatestBlockhash("confirmed")
      ).blockhash;

      transaction.lastValidBlockHeight = (
        await connection.getLatestBlockhash("confirmed")
      ).lastValidBlockHeight;

      // 2. send the transaction to your connected wallet and trigger a popup to sign the transaction.
      const resp = await sendTransaction(transaction, connection);

      console.log({ resp });

      await connection.confirmTransaction(resp, "confirmed");

      if (typeof onWalletConfirmation === "function") {
        onWalletConfirmation(disconnect);
      }
    } catch (error: any) {
      console.log(error);
      // Maybe show a notification that payment with wallet connection couldn't be initialized or write a logic to retry payment. Might have been network issues.
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center  py-3">
      <div className="flex justify-between items-center gap-2">
        <WalletMultiButton className="!bg-[#02084B]  text-white font-sm" />
        <button
          className={`font-semibold ${isLoading ? "opacity-50" : ""}`}
          onClick={onClickPay}
          disabled={!publicKey}
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};
