import React from 'react';
import styles from './ProductCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

// INTERFACE ATUALIZADA para camelCase
interface Produto {
  id: number;
  nome: string;
  descricaoCurta: string;
  preco: number;
  urlImagemPrincipal: string;
}

interface ProductCardProps {
  produto: Produto;
}

const ProductCard: React.FC<ProductCardProps> = ({ produto }) => {
  // Verificação para garantir que o produto e o preço não são nulos/undefined
  if (!produto || typeof produto.preco === 'undefined') {
    return null; // Ou renderizar um card de erro/placeholder
  }

  return (
    <div className={styles.card}>
      {/* USO DAS PROPRIEDADES ATUALIZADO para camelCase */}
      <Link href={`/produtos/${produto.id}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={produto.urlImagemPrincipal}
            alt={`Impressora 3D ${produto.nome}`}
            width={350}
            height={350}
            className={styles.productImage}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{produto.nome}</h3>
          <p className={styles.description}>{produto.descricaoCurta}</p>
          <div className={styles.footer}>
            <span className={styles.price}>R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
            <span className={styles.detailsButton}>Ver Detalhes</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;