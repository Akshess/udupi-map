import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Navbar from "../components/layout/NavBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Go Udupi",
    template: "%s | Go Udupi",
  },
  description:
    "Discover Udupi through interactive maps, transportation, history, local businesses, and AI assistance.",
  metadataBase: new URL("https://go-udupi.vercel.app"),
  openGraph: {
    siteName: "Go Udupi",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
          Built with ❤️ for Udupi ·{" "}
          <a
            href="https://github.com/Akshess/udupi-map"
            className="hover:text-gray-600 underline underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open source
          </a>
        </footer>
      </body>
    </html>
  );
}
