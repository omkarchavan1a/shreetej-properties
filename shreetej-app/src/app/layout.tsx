import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";


const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Shreetej Properties Builders & Developers | Sangamner Properties",
    template: "%s | Shreetej Properties",
  },
  description: "Total Real Estate Solution. Legally Secured. Best residential and commercial properties, land, and plots for sale in Sangamner. Trusted builders in Sangamner, Nashik, and Pune.",
  keywords: ["Sangamner properties", "real estate Sangamner", "buy plot in Sangamner", "flats in Sangamner", "builders in Sangamner", "Shreetej Properties", "commercial properties Sangamner", "Nashik properties"],
  verification: {
    google: "yWe-B2dWboZZqEC7BWYLgfzyCGXiIAv-jJ2ltrlgMFo",
  },
  openGraph: {
    title: "Shreetej Properties Builders & Developers | Sangamner Properties",
    description: "Total Real Estate Solution. Discover the best properties in Sangamner.",
    url: "https://shreetejproperties.com",
    siteName: "Shreetej Properties",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${raleway.variable} antialiased`}
      >
        <Preloader />
        <CustomCursor />
        {children}

      </body>
    </html>
  );
}
