import ProductCard from './components/ProductCard';
import styles from './Home.module.css'; 
import Link from 'next/link';

// INTERFACE ATUALIZADA para camelCase
interface Produto {
  id: number;
  nome: string;
  descricaoCurta: string;
  historia: string;
  preco: number;
  urlImagemPrincipal: string;
  especificacoes: string[];
}

async function getProducts(): Promise<Produto[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5257';
  try {
    const res = await fetch(`${apiUrl}/api/produtos`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Falha ao buscar dados da API: Status ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Erro detalhado ao buscar produtos:", error);
    return [];
  }
}

export default async function HomePage() {
  const produtos: Produto[] = await getProducts();

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
              Ver Impressoras
            </Link>
            <Link href="/sobre-nos" className={`${styles.heroButton} ${styles.secondaryButton}`}>
              Conheça a Chromatech
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Nossos Produtos em Destaque</h2>
        <div className={styles.productsGrid}>
          {produtos.map((produto) => (
            // USO DA PROPRIEDADE ATUALIZADO (produto.id) para a key prop
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </section>
    </main>
  );
}