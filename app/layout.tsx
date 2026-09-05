import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "PhoneTracking - Professional Phone Intelligence",
    template: "%s | PhoneTracking",
  },
  description:
    "Professional phone intelligence reports with carrier context, validation, location confidence and risk signals.",
  openGraph: {
    title: "PhoneTracking",
    description: "Phone intelligence for verifiable reports.",
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
      <body className="bg-grid">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
