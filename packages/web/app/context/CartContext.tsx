'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a interface do Produto (podes expandir isto)
interface Produto {
  id: number;
  nome: string;
  preco: number;
  urlImagemPrincipal: string;
}

// Define o item do carrinho, que inclui a quantidade
interface CartItem extends Produto {
  quantity: number;
}

// Define o que o nosso Contexto vai fornecer
interface ICartContext {
  cartItems: CartItem[];
  addToCart: (produto: Produto, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  getItemCount: () => number;
}

// Cria o Contexto com um valor padrão
const CartContext = createContext<ICartContext | undefined>(undefined);

// Cria o "Provedor" (o componente que gere o estado)
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Adiciona ao carrinho (ou atualiza a quantidade se já existir)
  const addToCart = (produto: Produto, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === produto.id);
      
      if (existingItem) {
        // Se existe, atualiza a quantidade
        return prevItems.map(item =>
          item.id === produto.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Se não existe, adiciona como novo item
        return [...prevItems, { ...produto, quantity }];
      }
    });
  };

  // Atualiza a quantidade de um item específico
  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0) // Remove se a quantidade for 0
    );
  };

  // Remove um item do carrinho
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Conta o total de itens no carrinho
  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Cria um "Hook" personalizado para ser fácil de usar
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};