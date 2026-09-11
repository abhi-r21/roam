import type { Metadata } from "next";
import { Geist, Geist_Mono, Faculty_Glyphic, Poppins, Libre_Franklin } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
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

const libra = Libre_Franklin({
  variable: "--font-lf",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-gp",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Yuvi",
  description: "Your travel agent",
  icons: {
    icon: "/oneworks-avatar-dog-256 (3).svg",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${facultyGlyphic.variable} ${poppins.variable} ${libra.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background selection:bg-blue-950 selection:text-blue-500">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
