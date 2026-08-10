import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voomi — Vídeos que vendem. Sem você aparecer.",
  description: "Ache produtos vencedores e crie vídeos com avatar por IA, prontos para postar — sem gravar, sem aparecer e sem editor.",
  icons: { icon: "/favicon-512.png", shortcut: "/favicon-512.png", apple: "/favicon-512.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
