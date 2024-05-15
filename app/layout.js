import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import SideBar from "./components/sidebar";
import AuthProvider from "./components/authProvider";
import StoreProvider from "../redux/StoreProvider";
import localFont from '@next/font/local'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const surt = localFont({
  src: '../font/Aban.ttf',
})

export const metadata = {
  title: "Movie Box",
  description: "Full-stack application about movies and tv",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
    <StoreProvider>
        <html lang="en" className={surt.className}>
          <body>
            <SideBar />
            <Navbar />       
            {children}
          </body>
        </html>
    </StoreProvider>
    </AuthProvider>
  );
}