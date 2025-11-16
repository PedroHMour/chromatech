import styles from './Home.module.css';
import Link from 'next/link';

// REMOVEMOS: import ProductCard from './components/ProductCard';
// REMOVEMOS: a interface Produto
// REMOVEMOS: a função getProducts()

export default async function HomePage() {
  // REMOVEMOS: const produtos: Produto[] = await getProducts();

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Precisão que <span className={styles.highlight}>Inspira</span>.
            <br />
            Tecnologia que <span className={styles.highlight}>Transforma</span>.
          </h1>
          <p className={styles.heroSubtitle}>
            Explore a vanguarda da impressão 3D com as impressoras Chromatech.
            <br/>
            Qualidade industrial e inovação ao seu alcance em Manaus.
          </p>
          <div className={styles.heroActions}>
            <Link href="/produtos" className={`${styles.heroButton} ${styles.primaryButton}`}>
              {/* Texto atualizado para consistência com o menu */}
              Ver Produtos
            </Link>
            <Link href="/sobre-nos" className={`${styles.heroButton} ${styles.secondaryButton}`}>
              Conheça a Chromatech
            </Link>
          </div>
        </div>
      </section>

      {/* REMOVEMOS A SECTION "Products Section" DAQUI.
        Isto cumpre o teu requisito de não ter cards na Home.
      */}
    </main>
  );
}