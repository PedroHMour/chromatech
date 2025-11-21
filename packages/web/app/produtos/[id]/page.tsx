import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './DetalhesProduto.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import InterestForm from '@/app/components/InterestForm';
import { produtos } from '@/data/content';

// GERAÇÃO ESTÁTICA
export async function generateStaticParams() {
  return produtos.map((produto) => ({
    id: produto.id.toString(),
  }));
}

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  const produto = produtos.find((p) => p.id.toString() === params.id);

  if (!produto) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.productGrid}>
        <div className={styles.gallery}>
          <div className={styles.mainImageWrapper}>
            <Image 
              src={produto.urlImagemPrincipal} 
              alt={produto.nome} 
              width={600} 
              height={600} 
              className={styles.mainImage} 
            />
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{produto.nome}</h1>
          <p className={styles.shortDescription}>{produto.descricaoCurta}</p>
          
          <div className={styles.stockInfo}>
            <FaCheckCircle className={styles.stockIcon} /> Solução Enterprise
          </div>

          <InterestForm produtoId={produto.id} nomeProduto={produto.nome} />
        </div>
      </div>
      
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