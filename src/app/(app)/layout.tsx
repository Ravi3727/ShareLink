import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/Context/AuthProvider";
import "@/app/globals.css";
import dotenv from 'dotenv';
import localfont from "next/font/local";
dotenv.config();

const druk = localfont({
  src:[{
    path : "../../fonts/static/InstrumentSans-Bold.ttf",
    weight: "100 900",
  },
],
variable:"--font-druk",
})
const InstrumentSans = localfont({
  src:[{
    path : "../../fonts/static/InstrumentSans-SemiBold.ttf",
    weight: "100 900",
  },
],
variable:"--font-instru",
})

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
          <div className={`${druk.variable,InstrumentSans.variable } w-full h-full  mx-auto p-2`}>
            <Navbar />
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
