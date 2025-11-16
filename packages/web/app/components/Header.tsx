'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
      setIsMenuOpen(false);
  }

  return (
    <header className={`${styles.header} ${hasScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logoLink} onClick={closeMenu}>
          <Image
            src="/images/logo.png"
            alt="Logo da Chromatech"
            width={160}
            height={45}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/produtos">Produtos</Link></li>
          <li><Link href="/sobre-nos">Sobre Nós</Link></li>
          <li><Link href="/aplicacoes">Aplicações</Link></li>
          <li><Link href="/suporte">Suporte</Link></li>
        </ul>

        {/* Action Icons */}
        <div className={styles.actionIcons}>
          <Link href="/carrinho" aria-label="Carrinho de Compras">
            <FaShoppingCart />
          </Link>
          <Link href="/minha-conta" aria-label="Minha Conta">
            <FaUserCircle />
          </Link>
          {/* Mobile Menu Button */}
          <button className={styles.mobileMenuButton} onClick={toggleMenu} aria-label="Abrir menu">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavLinks}>
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/produtos" onClick={closeMenu}>Produtos</Link></li>
            <li><Link href="/sobre-nos" onClick={closeMenu}>Sobre Nós</Link></li>
            <li><Link href="/aplicacoes" onClick={closeMenu}>Aplicações</Link></li>
            <li><Link href="/suporte" onClick={closeMenu}>Suporte</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;