import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SnackSutra — Pure Vegetarian Cloud Kitchen",
  description:
    "Fresh, flavourful pure vegetarian food delivered to your door. Order online from SnackSutra cloud kitchen — snacks, meals, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="font-body bg-[#FAFAF7] text-stone-800 antialiased">
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
