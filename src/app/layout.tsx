import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import NavbarWrapper from "@/components/navbar/navbarWrapper";
import FooterWrapper from "@/components/footer/footerWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Talent Bridge - Bridging Dreams to Reality",
  description:
    "Discover the perfect match for your career or hiring needs on Talent Bridge. Empowering job seekers and employers with a seamless platform for posting jobs, browsing opportunities, and building professional connections.",
  icons: {
    icon: "https://res.cloudinary.com/difaukz1b/image/upload/v1739765829/logo/cyivbskat7hf8dnbtahp.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.MIDTRANS_CLIENT_KEY}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarWrapper />
        <ToastContainer
          draggable
          closeOnClick
          autoClose={5000}
          position="bottom-right"
        />
        {children}
    
        <FooterWrapper />
      </body>
    </html>
  );
}
