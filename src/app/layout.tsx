"use client";

import { Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { HeaderBar } from "@/components/layout/header";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ตรวจสอบ path
  const showHeader = pathname !== "/login" && pathname !== "/register";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} font-mono`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {showHeader && <HeaderBar />}
          <main className={showHeader ? "pt-36 pb-36" : "pt-0 pb-0"}>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
