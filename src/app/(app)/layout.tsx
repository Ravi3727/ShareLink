import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/Context/AuthProvider";
import "@/app/globals.css";
import dotenv from 'dotenv';

dotenv.config();
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
export const metadata: Metadata = {
  title: "Solution",
  description: "Solution description here...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="w-[375px] h-[74px] mx-auto pl-[24px] pt-[16px] pr-[16px] pb-[16px]">
            <Navbar />
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
