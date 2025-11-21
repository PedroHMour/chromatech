import React from 'react';
import ProductCard from '@/app/components/ProductCard';
import styles from './Produtos.module.css';
import { produtos } from '@/data/content'; // Dados locais

export default function ProdutosPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nossas Soluções</h1>
        <p className={styles.subtitle}>Equipamentos de alta performance para a indústria 4.0.</p>
      </div>

      <section className={styles.productsSection}>
        <div className={styles.productsGrid}>
          {produtos.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </section>
    </main>
  );
}