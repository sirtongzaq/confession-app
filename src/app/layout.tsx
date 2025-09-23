import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { HeroHeader } from "@/components/layout/header";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Confession App",
  description: "Confession start 09/22/2025",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} font-mono`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeroHeader />
          <main className="pt-36 pb-36">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
