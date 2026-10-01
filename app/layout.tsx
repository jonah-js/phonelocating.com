import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.phonelocating.com"),
  title: {
    default: "PhoneLocating – Track Phone Number Accurate to 2M | 3D Satellite",
    template: "%s | PhoneLocating",
  },
  description:
    "Global phone number intelligence and satellite tracking. Real-time carrier verification, HLR network telemetry, and interactive 3D satellite imagery accurate to 2M.",
  openGraph: {
    title: "PhoneLocating – Track Phone Number Accurate to 2M",
    description:
      "Global phone number intelligence with interactive 3D satellite tracking and forensic dossier generation.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-grid min-h-screen flex flex-col justify-between antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
