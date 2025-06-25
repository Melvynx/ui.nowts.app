import { Header } from "@/components/header";
import { fontMono, fontSans } from "@/lib/fonts";
import { InjectDocs } from "@/lib/inject-docs.store";
import { getDocs } from "@/lib/mdx/mdx";
import { cn } from "@/lib/utils";
import { DialogManagerRenderer } from "@/registry/nowts/blocks/dialog-manager/dialog-manager-renderer";
import { ServerToaster } from "@/registry/nowts/blocks/server-toast/server-toast.server";
import { NextTopLoader } from "@/registry/nowts/components/next-top-loader";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  authors: [{ name: "Melvyn", url: "https://melvynx.dev" }],
  category: "developer",
  creator: "Melvyn",
  title: {
    default: "Now.ts: FullStack boilerplate for robust applications.",
    template: "Now.ts: %s",
  },
  description:
    "A boilerplate designed for creating robust FullStack applications. Provides copy-pasteable components ready for use, making the development process seamless.",
  icons: ["/favicon.ico"],
  keywords: [
    "Melvyn",
    "melvynx.dev",
    "nowts.app",
    "Now.ts",
    "FullStack",
    "Boilerplate",
    "Next.js",
    "React",
    "TypeScript",
    "TailwindCSS",
    "Better Auth",
    "Server Components",
    "Server Actions",
    "FullStack Developer",
    "Component library",
    "Copy and Paste",
    "Ready to use components",
    "Robust applications",
    "Development boilerplate",
    "SaaS",
    "Web Development",
    "Authentication",
    "OTP",
    "Toast notifications",
    "Modern UI",
    "Developer Tools",
  ],
  openGraph: {
    images: [
      {
        width: 1920,
        height: 1080,
        url: "https://ui.nowts.app/og-image.png",
        alt: "Now.ts - FullStack boilerplate",
      },
    ],
    locale: "en",
    siteName: "Now.ts",
    title: "Now.ts - FullStack boilerplate for robust applications",
    description:
      "A boilerplate designed for creating robust FullStack applications. Copy-pasteable components ready for use.",
    type: "website",
    url: "https://ui.nowts.app",
  },
  publisher: "Melvyn",
  twitter: {
    images: [
      {
        width: 1920,
        height: 1080,
        url: "https://ui.nowts.app/og-image.png",
        alt: "Now.ts - FullStack boilerplate",
      },
    ],
    card: "summary_large_image",
    title: "Now.ts: FullStack boilerplate for robust applications.",
    description:
      "A boilerplate designed for creating robust FullStack applications. Copy-pasteable components ready for use.",
    site: "@melvynx",
    creator: "Melvyn",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "overflow-x-hidden bg-background font-sans text-foreground antialiased outline-none",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <Toaster />
            <ServerToaster />
            <DialogManagerRenderer />
            <NextTopLoader />
            {children}
            <Suspense>
              <InjectDocsServer />
            </Suspense>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

export async function InjectDocsServer() {
  const docs = getDocs().sort(
    (a, b) => a.title?.localeCompare(b.title ?? "") ?? 0
  );
  return <InjectDocs docs={docs} />;
}
