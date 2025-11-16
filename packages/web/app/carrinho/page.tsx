'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import styles from './Carrinho.module.css';
import { FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const calcularSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.preco * item.quantity), 0);
  };

  const subtotal = calcularSubtotal();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Meu Carrinho</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Seu carrinho está vazio.</p>
          <Link href="/produtos" className={styles.continueButton}>
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className={styles.cartGrid}>
          {/* Coluna da Esquerda: Itens do Carrinho */}
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.urlImagemPrincipal}
                    alt={item.nome}
                    width={100}
                    height={100}
                  />
                </div>
                <div className={styles.itemInfo}>
                  <Link href={`/produtos/${item.id}`} className={styles.itemName}>
                    {item.nome}
                  </Link>
                  <span className={styles.itemPrice}>
                    R$ {item.preco.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className={styles.itemActions}>
                  <div className={styles.quantitySelector}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                    <FaTrash />
                  </button>
                </div>
                <div className={styles.itemTotal}>
                  R$ {(item.preco * item.quantity).toFixed(2).replace('.', ',')}
                </div>
              </div>
            ))}
          </div>

          {/* Coluna da Direita: Resumo do Pedido */}
          <div className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Frete</span>
              <span>Grátis (Manaus)</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <button className={styles.checkoutButton}>
              Ir para o Pagamento
            </button>
          </div>
        </div>
      )}
    </main>
  );
}