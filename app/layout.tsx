import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { Providers } from "@/components/providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZENVIA | Modern Fashion Marketplace",
  description:
    "Discover statement pieces, elevated basics, and curated collections inspired by the Zenvia storefront concept.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${archivo.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <Providers>
          <CartProvider>
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}


