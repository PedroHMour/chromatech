import ProductCard from './components/ProductCard';
import styles from './Home.module.css'; 

interface Produto {
  Id: number;
  Nome: string;
  DescricaoCurta: string;
  Historia: string;
  Preco: number;
  UrlImagemPrincipal: string;
  Especificacoes: string[];
}

// 2. Tipando o retorno da função que busca os dados
async function getProducts(): Promise<Produto[]> {
  // ATENÇÃO: Verifique a porta que seu backend está rodando.
  const res = await fetch('http://localhost:5257/api/produtos', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados da API');
  }

  return res.json();
}

export default async function HomePage() {
  // 3. O TypeScript agora sabe que a variável 'produtos' é um array de 'Produto'
  const produtos: Produto[] = await getProducts();

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Chromatech: Dando Vida às Suas Ideias</h1>
        <p className={styles.heroSubtitle}>Impressoras 3D de alta performance para todos os níveis de criatividade.</p>
        <button className={styles.heroButton}>Conheça Nossas Impressoras</button>
      </section>

      <section className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Nossos Produtos</h2>
        <div className={styles.productsGrid}>
          {produtos.map((produto) => (
            <ProductCard key={produto.Id} produto={produto} />
          ))}
        </div>
      </section>
    </main>
  );
}