'use client'; // Diretiva necessária para usar hooks como useState

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  // Estado para controlar a visibilidade do menu móvel
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logoLink}>
          <Image
          src="/images/logo.png" 
          alt="Logo da Chromatech"
          width={160} 
          height={45} 
          priority
          />
        </Link>

        {/* Links de Navegação para Desktop */}
        <ul className={styles.navLinks}>
          <li><Link href="/produtos">Impressoras 3D</Link></li>
          <li><Link href="/sobre-nos">Sobre Nós</Link></li>
          <li><Link href="/aplicacoes">Aplicações</Link></li>
          <li><Link href="/suporte">Suporte</Link></li>
        </ul>

        {/* Ícones de Ação */}
        <div className={styles.actionIcons}>
          <Link href="/carrinho" aria-label="Carrinho de Compras">
            <FaShoppingCart />
          </Link>
          <Link href="/minha-conta" aria-label="Minha Conta">
            <FaUserCircle />
          </Link>
        </div>

        {/* Botão do Menu Hambúrguer para Mobile */}
        <button className={styles.mobileMenuButton} onClick={toggleMenu} aria-label="Abrir menu">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Menu Dropdown para Mobile */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavLinks}>
            <li><Link href="/produtos" onClick={toggleMenu}>Impressoras 3D</Link></li>
            <li><Link href="/sobre-nos" onClick={toggleMenu}>Sobre Nós</Link></li>
            <li><Link href="/aplicacoes" onClick={toggleMenu}>Aplicações</Link></li>
            <li><Link href="/suporte" onClick={toggleMenu}>Suporte</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;