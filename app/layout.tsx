import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeTransitionProvider } from "@/components/ThemeTransitionContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadDash | Gestão Moderna",
  description: "Dashboard de gestão de leads high-end",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <ThemeTransitionProvider>
            {children}
          </ThemeTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
