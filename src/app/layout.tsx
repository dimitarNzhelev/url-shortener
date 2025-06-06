import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "~/components/layout/header";
import MovingBackground from "~/components/layout/background";
import Footer from "~/components/layout/footer";
import SessionProviderWrapper from "~/components/session-provider-wrapper";

export const metadata: Metadata = {
  title: "ShortLink",
  description: "ShortLink is a URL shortening service.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen w-full bg-gray-900 text-white">
        <SessionProviderWrapper>
          <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 to-gray-800 transition-colors duration-300">
            <Header />
            <MovingBackground />
            <main className="flex flex-grow items-center justify-center">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
