import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deepu's Collection | Premium Luxury Sarees",
  description: "Discover timeless luxury sarees crafted for moments that deserve to be remembered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${lato.variable} font-sans antialiased min-h-screen flex flex-col bg-[#0D0612] text-[#FAF9F6]`}
      >
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
