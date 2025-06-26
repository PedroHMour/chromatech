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
              alt="Logo da Chromatech"
              width={180}
              height={50}
              priority
            />
          </Link>
          <p className={styles.tagline}>Dando vida às suas ideias com tecnologia de ponta.</p>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Navegação</h4>
            <ul>
              <li><Link href="/produtos">Impressoras 3D</Link></li>
              <li><Link href="/sobre-nos">Sobre Nós</Link></li>
              <li><Link href="/aplicacoes">Aplicações</Link></li>
              <li><Link href="/suporte">Suporte</Link></li>
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Legal</h4>
            <ul>
              <li><Link href="/termos">Termos de Serviço</Link></li>
              <li><Link href="/privacidade">Política de Privacidade</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.newsletterSection}>
          <h4 className={styles.linkTitle}>Fique por Dentro</h4>
          <p>Receba as últimas novidades e promoções exclusivas da Chromatech.</p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Seu melhor e-mail" required />
            <button type="submit">Inscrever-se</button>
          </form>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Chromatech. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;