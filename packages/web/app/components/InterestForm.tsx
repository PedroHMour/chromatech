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
    const data = new FormData(form);
    data.append('Produto', nomeProduto);

    try {
      // SUBSTITUI PELO TEU ENDPOINT DO FORMSPREE
      const response = await fetch('https://formspree.io/f/SEU_CODIGO_AQUI', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successBox}>
        <h3>Mensagem Enviada!</h3>
        <p>Entraremos em contacto sobre a {nomeProduto}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Lista de Espera</h3>
      <p>Receba novidades sobre a {nomeProduto}.</p>
      <div className={styles.field}>
        <input name="Nome" type="text" placeholder="Nome" required className={styles.input} />
      </div>
      <div className={styles.field}>
        <input name="Email" type="email" placeholder="Email" required className={styles.input} />
      </div>
      <div className={styles.field}>
        <input name="Telefone" type="tel" placeholder="Telefone" className={styles.input} />
      </div>
      <button type="submit" disabled={status === 'loading'} className={styles.button}>
        {status === 'loading' ? 'Enviando...' : 'Tenho Interesse'}
      </button>
      {status === 'error' && <p className={styles.errorMsg}>Erro ao enviar. Tente novamente.</p>}
    </form>
  );
}