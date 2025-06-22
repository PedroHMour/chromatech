import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header"; 


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chromatech - Impressoras 3D",
  description: "Dando vida às suas ideias com tecnologia de ponta para a região de Manaus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}> 
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}