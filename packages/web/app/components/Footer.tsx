import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logo.png"
              alt="Chromatech"
              width={180}
              height={50}
              priority
            />
          </Link>
          <p className={styles.tagline}>Dando vida às suas ideias com tecnologia de ponta.</p>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Navegação</h4>
            <ul>
              <li><Link href="/produtos">Soluções</Link></li>
              <li><Link href="/sobre-nos">Sobre Nós</Link></li>
              <li><Link href="/aplicacoes">Aplicações</Link></li>
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Legal</h4>
            <ul>
              <li><Link href="#">Termos de Serviço</Link></li>
              <li><Link href="#">Política de Privacidade</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.newsletterSection}>
          <h4 className={styles.linkTitle}>Contacto</h4>
          <p>Tem alguma dúvida? Fale conosco.</p>
          <div style={{ color: 'var(--cor-neutra-cinza-claro)', fontSize: '0.9rem' }}>
            <p>Manaus - AM</p>
            <p>contato@chromatech.com.br</p>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Chromatech. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;