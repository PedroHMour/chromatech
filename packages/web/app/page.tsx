'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="relative w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        
        {/* Efeito de fundo (Luz) */}
        <div className="pointer-events-none absolute top-[-20%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="relative z-10 max-w-4xl">
          
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#00E676] backdrop-blur-sm"
          >
            O Futuro da Indústria 4.0
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Precisão que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#00E676]">
              Transforma.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-10 text-lg text-gray-400 md:text-xl max-w-2xl mx-auto"
          >
            Explore a vanguarda da impressão 3D. Qualidade industrial e inovação ao seu alcance, diretamente de Manaus para o mundo.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link 
              href="/produtos" 
              className="group relative flex h-12 items-center justify-center overflow-hidden rounded-full bg-[#0052FF] px-8 font-bold text-white transition-all hover:bg-[#00E676] hover:text-black hover:shadow-[0_0_30px_rgba(0,82,255,0.4)]"
            >
              <span className="relative z-10">Ver Soluções</span>
            </Link>
            
            <Link 
              href="/sobre-nos" 
              className="flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-8 font-bold text-white transition-all hover:border-white/50 hover:bg-white/5"
            >
              Conheça a Chromatech
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}