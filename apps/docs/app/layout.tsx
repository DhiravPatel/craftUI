import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@craftui/ui";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://craftui.dev"),
  title: {
    default: "CraftUI — Beautifully designed components you own",
    template: "%s — CraftUI",
  },
  description:
    "CraftUI is an open-source collection of Tailwind-native, accessibility-first React components. Copy, paste, extend. No runtime dependency.",
  keywords: [
    "React",
    "Tailwind",
    "components",
    "design system",
    "shadcn",
    "radix",
    "accessible",
    "typescript",
  ],
  authors: [{ name: "CraftUI" }],
  openGraph: {
    title: "CraftUI",
    description:
      "Beautifully designed, accessible components that you own. Copy, paste, extend.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-background font-sans`}
      >
        <ThemeProvider defaultTheme="system">
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
