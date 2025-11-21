/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Gera HTML estático
  images: {
    unoptimized: true, // Obrigatório para HostGator
  },
  trailingSlash: true, // Ajuda nas rotas
};

module.exports = nextConfig;