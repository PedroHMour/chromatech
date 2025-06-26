import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './DetalhesProduto.module.css';
import { FaShoppingCart, FaCheckCircle } from 'react-icons/fa';

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

async function getProduct(id: string): Promise<Produto | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5257';
  try {
    const res = await fetch(`${apiUrl}/api/produtos/${id}`, {
      next: { revalidate: 600 }, 
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Falha ao buscar dados da API: Status ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Erro detalhado ao buscar produto:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const produto = await getProduct(params.id);

  if (!produto) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.productGrid}>
        {/* Coluna da Galeria de Imagens */}
        <div className={styles.gallery}>
          <div className={styles.mainImageWrapper}>
            {/* USO DAS PROPRIEDADES ATUALIZADO */}
            <Image
              src={produto.urlImagemPrincipal}
              alt={`Imagem principal de ${produto.nome}`}
              width={600}
              height={600}
              className={styles.mainImage}
            />
          </div>
        </div>

        {/* Coluna de Informações e Ações */}
        <div className={styles.info}>
          <h1 className={styles.title}>{produto.nome}</h1>
          <p className={styles.shortDescription}>{produto.descricaoCurta}</p>
          <div className={styles.price}>
            R$ {produto.preco.toFixed(2).replace('.', ',')}
          </div>

          <div className={styles.stockInfo}>
            <FaCheckCircle className={styles.stockIcon} /> Em estoque e pronto para envio em Manaus
          </div>

          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button>-</button>
              <input type="text" value="1" readOnly />
              <button>+</button>
            </div>
            <button className={styles.addToCartButton}>
              <FaShoppingCart /> Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>

      {/* Seção de Abas com Detalhes */}
      <div className={styles.detailsSection}>
        <div className={styles.tabContent}>
          <h2 className={styles.tabTitle}>Descrição Completa</h2>
          <p className={styles.historyText}>{produto.historia}</p>
        </div>
        <div className={styles.tabContent}>
          <h2 className={styles.tabTitle}>Especificações Técnicas</h2>
          <ul className={styles.specsList}>
            {produto.especificacoes.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}