import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Download Quwwathul Islam App | Official Madrasa Management System",
  description: "Download the official Quwwathul Islam Madrasa app for parents and teachers. Track attendance, receive notifications, and monitor academic progress.",
  keywords: ["Madrasa App", "Quwwathul Islam", "Madrasa Management", "Education App", "Palakkad"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
