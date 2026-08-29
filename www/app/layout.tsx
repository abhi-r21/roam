import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Faculty_Glyphic, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-is",
  subsets: ["latin"],
  weight: ["400"],
});

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-gp",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Yuvly - Your travel buddy",
  description: "Your travel buddy",
  icons: {
    icon: "/yuvly_new.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${facultyGlyphic.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FCFCFD] selection:bg-blue-500 selection:text-white font-poppins">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
