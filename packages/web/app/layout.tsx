import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chromatech - Impressoras 3D",
  description: "Dando vida às suas ideias com tecnologia de ponta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* 3. Aplicar a classe da fonte ao body. Isso fará com que toda a aplicação herde a fonte. */}
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
        {/* Você também pode adicionar um Footer aqui no futuro */}
      </body>
    </html>
  );
}