import { Zen_Dots } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/Providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Background from "@/components/global/Background";
import WalletConnectButton from "@/components/global/WalletConnectButton";
import { Lilita_One } from "next/font/google";

const zen = Lilita_One({ subsets: ["latin"], weight: ['400'] });

export const metadata = {
  title: "Jimbos Rumble",
  description: "NFT Battle Royale",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className=" w-screen h-screen bg-black ">
      <body className={zen.className + " w-screen h-screen"}>
        <Providers>
          <ToastContainer />
          <Background/>
          
          {children}
        </Providers>
      </body>
    </html>
  );
}
