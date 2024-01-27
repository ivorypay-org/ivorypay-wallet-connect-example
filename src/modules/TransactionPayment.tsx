import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import CustomInput from "../components/Input/CustomInput";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import {
  IvorypayClient,
  TransactionInitiationInput,
  TransactionInitiationResponse,
} from "../services/ivorypay-client";
import { WalletConnect } from "../components/wallet-connect/WalletConnect";
import { LoadingOutlined } from "@ant-design/icons";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { CustomWalletContext } from "../components/wallet-connect/WalletContext";

const network = WalletAdapterNetwork.Devnet;
const ivorypayClient = new IvorypayClient();

const Payment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tnxStatus, setTnxStatus] = useState<string>("");
  const [tnx, setTnx] = useState<TransactionInitiationResponse | null>(null);
  const [input, setInput] = useState<TransactionInitiationInput>({
    amount: 1000,
    baseFiat: "NGN",
    crypto: "USDT",
    email: "",
  });

  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePayWithWalletConnectButtonClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await ivorypayClient.initiateTransaction({
        ...input,
        email: input.email || "example@email.com",
        amount: input.amount,
      });
      setTnx(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onWalletConfirmation = async (disconnect: () => void) => {
    if (tnxStatus === "") setTnxStatus("pending");

    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (tnxStatus !== "pending") return resolve({});

        try {
          const response = await ivorypayClient.verify(tnx?.reference!);
          setTnxStatus(response.status);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, 5000);

      disconnect();
    });
  };

  useEffect(() => {
    if (tnx?.id) {
      let timeInterval = setTimeout(() => {
        socketRef.current = io(`https://api.ivorypay.io/${tnx?.id}`, {
          reconnection: true,
          reconnectionAttempts: 3,
          reconnectionDelay: 1000,
        });
        socketRef.current.on("updated", (data: any) => {
          console.log("Socket connected !!!");
          if (["success", "failed"].includes(data.status)) {
            setTnxStatus(data.status);
          }
        });
      }, 10000);

      return () => {
        clearTimeout(timeInterval);
        if (socketRef.current) {
          socketRef.current.disconnect();
          console.log("Socked disconnected !!!");
        }
      };
    }
  }, [tnx]);

  return (
    <div className="px-72 py-24">
      <h1 className="text-center font-bold mb-0">Checkout Example</h1>
      <p className="mb-4 text-center">
        You can always reload this page to restart the process.
      </p>

      {loading && (
        <p className="text-center">
          Loading... <LoadingOutlined />
        </p>
      )}

      <div className="px-4 pb-20">
        {tnx ? (
          <div className="px-4 pb-20">
            <CustomWalletContext network={network}>
              <WalletConnect
                txReference={tnx.reference}
                onWalletConfirmation={onWalletConfirmation}
              />
            </CustomWalletContext>
          </div>
        ) : (
          <div className="px-4 pb-20">
            <div className="my-4 relative">
              <label className="text-[#2c3489] font-medium text-xs md:text-sm">
                Email
              </label>
              <div className="relative">
                <CustomInput
                  className="font-bold text-xs text-[#02084B] md:text-sm"
                  placeholder="Enter your email address"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="my-4 relative">
              <label className="text-[#2c3489] font-medium text-xs md:text-sm">
                Amount In Base Fiat ({input.baseFiat})
              </label>
              <div className="relative">
                <CustomInput
                  className="text-xs text-[#02084B] md:text-sm"
                  placeholder="amount"
                  value={input.amount}
                />
              </div>
            </div>

            <div className="mb-4 w-full relative">
              <div className="flex flex-col space-y-1 w-full">
                <label className="text-[#2c3489] w-full font-medium text-xs md:text-sm ">
                  Cryptocurrency
                </label>
              </div>

              <CustomInput
                className="mt-1 text-xs md:text-sm"
                value={input.crypto}
                disabled
              />
            </div>

            <div className="my-4">
              <label className="text-[#2c3489] font-medium text-xs md:text-sm">
                Network{" "}
              </label>
              <CustomInput
                className="text-xs md:text-sm"
                disabled
                value={"Solana (SOL)"}
              />
            </div>

            <p className="text-xs text-[#E31D1C] md:text-sm">
              Note: This transaction is on the SOL network. Please ensure that
              you select the SOL network when sending tokens to avoid token
              loss.
            </p>

            <br />

            <Button
              className="w-full bg-[#02084B] text-white font-semibold"
              onClick={handlePayWithWalletConnectButtonClick}
            >
              Pay with Wallet Connect
            </Button>
          </div>
        )}

        {tnxStatus && (
          <p className="text-center">
            {tnxStatus === "pending" ? (
              "Pending verification"
            ) : (
              <span
                className="font-bold"
                style={{ color: tnxStatus === "failed" ? "red" : "green" }}
              >
                {tnxStatus.toUpperCase()}!
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Payment;
