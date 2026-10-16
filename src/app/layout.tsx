import type { Metadata } from "next";
import { Hind_Siliguri, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/component/header/Header";
import Footer from "./component/Footer/Footer";
import Marquee from "./component/Marquee";
import NavLinks from "./component/NavLinks";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hindSiliguri.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="m-10 bg-green-50">
        <Header />
        <NavLinks />
        <Marquee />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}