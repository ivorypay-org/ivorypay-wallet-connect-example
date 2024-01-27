import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  CoinbaseWalletAdapter,
  TrustWalletAdapter,
  SolflareWalletAdapter,
  ExodusWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  TokenPocketWalletAdapter,
  TorusWalletAdapter,
  Coin98WalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo, ReactNode, FC, useEffect } from "react";

export const CustomWalletContext: FC<{
  children: ReactNode;
  network: WalletAdapterNetwork;
}> = ({ children, network }) => {
  const endpoint =
    "https://winter-cold-smoke.solana-devnet.quiknode.pro/692e875737df74fba5aed970a8620c5504cd7517	";

  let walletList = useMemo(
    () =>
      window.innerWidth <= 768
        ? [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new TorusWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new CoinbaseWalletAdapter(),
            new ExodusWalletAdapter(),
            new TokenPocketWalletAdapter(),
            new TrustWalletAdapter(),
            new MathWalletAdapter(),
            new Coin98WalletAdapter(),
          ]
        : [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new TorusWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new LedgerWalletAdapter(),
            new CoinbaseWalletAdapter(),
            new ExodusWalletAdapter(),
            new TokenPocketWalletAdapter(),
            new MathWalletAdapter(),
            new Coin98WalletAdapter(),
          ],
    [network]
  );
  const wallets = useMemo(() => walletList, [walletList]);

  useEffect(() => {
    localStorage.removeItem("walletName");
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
