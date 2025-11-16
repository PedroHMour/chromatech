'use client'; // <-- Define isto como um Client Component

import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import styles from './DetalhesProduto.module.css'; // Reutiliza o CSS existente
import { FaShoppingCart } from 'react-icons/fa';

// Define a interface do Produto (deve ser a mesma do Contexto)
interface Produto {
  id: number;
  nome: string;
  preco: number;
  urlImagemPrincipal: string;
  // Adiciona outros campos se o 'addToCart' precisar deles
}

interface ProductActionsProps {
  produto: Produto;
}

const ProductActions: React.FC<ProductActionsProps> = ({ produto }) => {
  const [quantity, setQuantity] = useState(1); // Estado local para a quantidade
  const { addToCart } = useCart(); // Hook do nosso contexto

  const handleDecrease = () => {
    setQuantity(prev => Math.max(1, prev - 1)); // Não deixa ser menor que 1
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1); // Aumenta a quantidade
  };

  const handleAddToCart = () => {
    addToCart(produto, quantity);
    // Opcional: Mostrar uma notificação de "Adicionado!"
    alert(`${quantity}x ${produto.nome} adicionado(s) ao carrinho!`); 
  };

  return (
    <div className={styles.actions}>
      <div className={styles.quantitySelector}>
        <button onClick={handleDecrease}>-</button>
        <input type="text" value={quantity} readOnly />
        <button onClick={handleIncrease}>+</button>
      </div>
      <button className={styles.addToCartButton} onClick={handleAddToCart}>
        <FaShoppingCart /> Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductActions;