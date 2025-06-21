import React from 'react';
import styles from './ProductCard.module.css';
import Image from 'next/image';
import Link from 'next/link'; // Importe o Link do Next.js

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
      <div className={styles.imageWrapper}>
        <Image 
          src={produto.UrlImagemPrincipal} 
          alt={`Impressora 3D ${produto.Nome}`}
          width={300}
          height={300}
          className={styles.productImage}
        />
      </div>
      <div className={styles.content}>
        <div>
            <h3 className={styles.title}>{produto.Nome}</h3>
            <p className={styles.description}>{produto.DescricaoCurta}</p>
        </div>
        <div>
            <div className={styles.price}>R$ {produto.Preco.toFixed(2).replace('.', ',')}</div>
            {/* Usando o componente Link para navegação otimizada */}
            <Link href={`/produtos/${produto.Id}`} className={styles.detailsButton}>
              Ver Detalhes
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;