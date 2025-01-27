import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";

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
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer
          draggable
          closeOnClick
          autoClose={5000}
          position="bottom-right"
        />
        {children}
      </body>
    </html>
  );
}
