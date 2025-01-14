import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import { FavoritesProvider } from "../lib/favorites/favorites-context";
import { WatchLaterProvider } from "../lib/watch-later/watch-later-context";
import { Session } from "next-auth";
import { SessionWrapper } from "@/lib/session-wrapper/session-wrapper";
import { Footer } from "@/components/footer/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieMind - Social Movie Recommendations",
  description:
    "Discover movies through your social circle and personalized recommendations",
};

export default function RootLayout({
  children,
  params: { session, ...params },
}: {
  children: React.ReactNode;
  params: { session?: Session | null };
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SessionWrapper session={session}>
            <FavoritesProvider>
              <WatchLaterProvider>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <main className="container mx-auto px-4 py-4">
                    {children}
                  </main>
                  <Footer />
                </div>
                <Toaster />
              </WatchLaterProvider>
            </FavoritesProvider>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
