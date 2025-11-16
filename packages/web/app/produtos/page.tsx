import ProductCard from '@/app/components/ProductCard';
import styles from './Produtos.module.css'; // Vamos criar este CSS a seguir

// Esta interface é a mesma que tinhas na Home
interface Produto {
  id: number;
  nome: string;
  descricaoCurta: string;
  historia: string;
  preco: number;
  urlImagemPrincipal: string;
  especificacoes: string[];
}

// Esta função busca TODOS os produtos
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

// Esta é a nova página de lista de produtos
export default async function ProdutosPage() {
  const produtos: Produto[] = await getProducts();

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nossos Produtos</h1>
        <p className={styles.subtitle}>Explore todas as nossas impressoras, filamentos e acessórios.</p>
      </div>

      <section className={styles.productsSection}>
        <div className={styles.productsGrid}>
          {produtos.map((produto) => (
            // O ProductCard é reutilizado aqui
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </section>
    </main>
  );
}