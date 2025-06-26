import React from 'react';
import styles from './ProductCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface Produto {
  Id: number;
  Nome: string;
  DescricaoCurta: string;
  Preco: number;
  UrlImagemPrincipal: string;
}

interface ProductCardProps {
  produto: Produto;
}

const ProductCard: React.FC<ProductCardProps> = ({ produto }) => {
  return (
    <div className={styles.card}>
      <Link href={`/produtos/${produto.Id}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={produto.UrlImagemPrincipal}
            alt={`Impressora 3D ${produto.Nome}`}
            width={350}
            height={350}
            className={styles.productImage}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{produto.Nome}</h3>
          <p className={styles.description}>{produto.DescricaoCurta}</p>
          <div className={styles.footer}>
            <span className={styles.price}>R$ {produto.Preco.toFixed(2).replace('.', ',')}</span>
            <span className={styles.detailsButton}>Ver Detalhes</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;