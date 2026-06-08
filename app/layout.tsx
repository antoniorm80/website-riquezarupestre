import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { siteConfig} from '@/config/site'
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
 title: `${siteConfig.name} - ${siteConfig.description}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  keywords: ["your keywords"],
  robots: "index, follow",
  authors: [{ name: "Dorian Baffier", url: "https://x.com/dorian_baffier" }],
  creator: "Dorian Baffier",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dorian_baffier",
    title: siteConfig.name,
    description: siteConfig.description,
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
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistSans.className} antialiased`}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem 
        > */}
          {/* <Header/>  */}
          {/* <main className="relative min-h-screen w-fulloverflow-hidden scroll-smooth pt-14"> */}
            {children}
          {/* </main> */}
          {/* <Footer/> */}
        {/* </ThemeProvider> */}
        </body>
    </html>
  );
}
