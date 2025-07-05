import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import videoStyles from './components/BackgroundVideo.module.css'; // MODIFICAÇÃO: Importa os estilos do vídeo

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
        {/* INÍCIO DA MODIFICAÇÃO: Componente de Vídeo de Fundo */}
        <div className={videoStyles.videoContainer}>
          <video autoPlay loop muted playsInline className={videoStyles.video}>
            <source src="/videos/background-video.mp4" type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
        {/* FIM DA MODIFICAÇÃO */}

        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}