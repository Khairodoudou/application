import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Smart Health - Plateforme Santé Numérique Intelligente",
  description: "Connectez-vous avec votre médecin, gérez votre dossier santé et analysez vos produits alimentaires en toute sécurité.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="smart-health-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
