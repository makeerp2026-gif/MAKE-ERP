import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast"; // 🚀 Magic Popups ke liye naya import
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAKE ERP", // 🚀 Browser tab ka naam update kar diya
  description: "Modern School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        {/* 🚀 Global Toaster Yahan Add Kiya Hai */}
        <Toaster 
          position="top-center" 
          reverseOrder={false} 
          toastOptions={{
            // Default styling for toasts
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              fontWeight: '500',
            },
          }}
        />
        
        {children}
      </body>
    </html>
  );
}