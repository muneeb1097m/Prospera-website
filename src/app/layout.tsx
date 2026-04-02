import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Prospera Group USA - Premium Bookkeeping Services",
    template: "%s | Prospera Group USA",
  },
  description: "Recurring Monthly Bookkeeping for U.S. Small Businesses. We provide financial oversight and organized reporting.",
  keywords: ["bookkeeping", "accounting", "small business", "financial oversight", "Prospera Group USA"],
  authors: [{ name: "Prospera Group USA" }],
  creator: "Prospera Group USA",
  publisher: "Prospera Group USA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://prosperagroup.us"), // Replace with actual domain if different
  openGraph: {
    title: "Prospera Group USA - Premium Bookkeeping Services",
    description: "Recurring Monthly Bookkeeping for U.S. Small Businesses.",
    url: "https://prosperagroup.us",
    siteName: "Prospera Group USA",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists or I should create a placeholder/note
        width: 1200,
        height: 630,
        alt: "Prospera Group USA",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prospera Group USA - Premium Bookkeeping Services",
    description: "Recurring Monthly Bookkeeping for U.S. Small Businesses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "HPAOT0SqUgbXvKIzL3G2-1n6oB1YCDiuJEgqcpI9r04",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased font-sans`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DCYZFW7028"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-DCYZFW7028');
          `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
