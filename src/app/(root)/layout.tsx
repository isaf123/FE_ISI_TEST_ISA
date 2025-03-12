"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex justify-between px-44 py-4 items-center border-b-1 border-gray-300 shadow-xs">
          <p className="text-xl font-black">todo-list</p>

          <button
            className="rounded-md text-sm cursor-pointer px-3 py-2 bg-red-600 text-gray-50"
            onClick={() => {
              Cookies.remove("token");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </nav>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
