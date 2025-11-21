'use client';

import React, { useState } from 'react';
import styles from './InterestForm.module.css';

interface InterestFormProps {
  produtoId: number;
  nomeProduto: string;
}

export default function InterestForm({ produtoId, nomeProduto }: InterestFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Prepara os dados para enviar como JSON
    const data = {
      Nome: formData.get('Nome'),
      email: formData.get('email'),
      Telefone: formData.get('Telefone'),
      Produto: nomeProduto,
      ID_Interno: produtoId
    };

    try {
      // Aponta para o arquivo PHP que criamos na pasta public
      const response = await fetch('/send-mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setStatus('success');
        form.reset();
      } else {
        console.error('Erro no servidor:', result);
        setStatus('error');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successBox}>
        <h3>Inscrição Confirmada!</h3>
        <p>Recebemos seus dados. Verifique seu e-mail em breve com as instruções.</p>
        <button 
          onClick={() => setStatus('idle')} 
          className="mt-4 text-sm font-bold underline cursor-pointer bg-transparent border-none p-0 text-inherit"
        >
          Cadastrar outro e-mail
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <input 
          name="Nome" 
          type="text" 
          placeholder="Seu Nome Completo" 
          required 
          className={styles.input} 
        />
      </div>
      <div className={styles.field}>
        <input 
          name="email" 
          type="email" 
          placeholder="Seu Melhor E-mail" 
          required 
          className={styles.input} 
        />
      </div>
      <div className={styles.field}>
        <input 
          name="Telefone" 
          type="tel" 
          placeholder="WhatsApp com DDD" 
          required 
          className={styles.input} 
        />
      </div>
      
      <button type="submit" disabled={status === 'loading'} className={styles.button}>
        {status === 'loading' ? 'Processando...' : 'QUERO GARANTIR MINHA VAGA'}
      </button>
      
      {status === 'error' && (
        <p className={styles.errorMsg}>
          Erro ao conectar com o servidor. Tente novamente ou chame no WhatsApp.
        </p>
      )}
    </form>
  );
}