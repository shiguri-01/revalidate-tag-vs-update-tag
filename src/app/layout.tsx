import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "revalidateTag vs. updateTag",
  description:
    "A demo project to compare revalidateTag and updateTag in Next.js 16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <a
          href="https://github.com/shiguri-01/revalidate-tag-vs-update-tag"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-3 right-3 z-50 rounded-sm px-2 py-1 text-xs text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60"
          aria-label="View source on GitHub"
        >
          <span className="hidden sm:inline">View on GitHub </span>
          <span className="sm:hidden">GitHub</span>
        </a>
        {children}
      </body>
    </html>
  );
}
