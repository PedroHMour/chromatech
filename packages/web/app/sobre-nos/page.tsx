import React from 'react';
import styles from './SobreNos.module.css';
import TeamCard from '@/app/components/TeamCard';
import { FaBullseye, FaEye } from 'react-icons/fa';

// =======================================================================
// INÍCIO DA MODIFICAÇÃO: BUSCAR DADOS DA API
// =======================================================================

// 1. Define a interface para os dados que virão da API
// (Nota: a API .NET converte PascalCase para camelCase, ex: UrlFoto -> urlFoto)
interface Representante {
  id: number;
  nome: string;
  cargo: string;
  biografia: string;
  urlFoto: string;
}

// 2. Remove o array estático 'teamMembers'
// const teamMembers = [ ... ]; // <-- ISTO FOI REMOVIDO

// 3. Cria a função para buscar os dados da API
async function getTeam(): Promise<Representante[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5257';
  try {
    // Busca no novo endpoint /api/representantes
    const res = await fetch(`${apiUrl}/api/representantes`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Falha ao buscar dados da API: Status ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Erro detalhado ao buscar equipa:", error);
    return [];
  }
}

// 4. Transforma o componente em 'async' e busca os dados
const AboutUsPage = async () => {
  const teamMembers = await getTeam(); // Busca os dados reais da API

// =======================================================================
// FIM DA MODIFICAÇÃO
// =======================================================================

  return (
    <main className={styles.main}>
      {/* Seção Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Inovação e Paixão pela <span className={styles.highlight}>Tecnologia 3D</span>
          </h1>
          <p className={styles.subtitle}>
            Somos a Chromatech, uma empresa nascida em Manaus com a missão de revolucionar o acesso à impressão 3D de alta performance na Amazônia e no mundo.
          </p>
        </div>
      </section>

      {/* Seção de Missão, Visão e Valores (sem alterações) */}
      <section className={styles.missionSection}>
        <div className={styles.missionGrid}>
          <div className={styles.missionCard}>
            <FaBullseye className={styles.missionIcon} />
            <h2 className={styles.missionTitle}>Nossa Missão</h2>
            <p>Desenvolver e fornecer soluções inovadoras em impressão 3D que melhorem a qualidade de vida das pessoas, promovendo a criatividade, a sustentabilidade e a inovação em diversas áreas, como educação, medicina, arte e indústria.</p>
          </div>
          <div className={styles.missionCard}>
            <FaEye className={styles.missionIcon} />
            <h2 className={styles.missionTitle}>Nossa Visão</h2>
            <p>Ser referência global em tecnologia de impressão 3D, reconhecida pela inovação, qualidade e compromisso com a sustentabilidade, contribuindo para um futuro melhor para as próximas gerações.</p>
          </div>
        </div>
      </section>
      
      {/* Seção de Valores (sem alterações) */}
      <section className={styles.valuesSection}>
         <h2 className={styles.sectionTitle}>Nossos Valores</h2>
         <div className={styles.valuesGrid}>
            <div className={styles.valueItem}><strong>Inovação:</strong> Buscar constantemente novas soluções e tecnologias que impactem positivamente a vida das pessoas.</div>
            <div className={styles.valueItem}><strong>Sustentabilidade:</strong> Desenvolver produtos e soluções ambientalmente responsáveis e socialmente justas.</div>
            <div className={styles.valueItem}><strong>Qualidade:</strong> Garantir excelência em todos os produtos e serviços oferecidos.</div>
            <div className={styles.valueItem}><strong>Colaboração:</strong> Trabalhar em parceria com clientes, parceiros e comunidades para criar soluções que atendam às suas necessidades.</div>
            <div className={styles.valueItem}><strong>Responsabilidade:</strong> Atuar com integridade e ética, assumindo a responsabilidade por todas as ações e decisões do negócio.</div>
         </div>
      </section>

      {/* Seção da Equipe */}
      <section className={styles.teamSection}>
        <div className={styles.teamContent}>
          <h2 className={styles.sectionTitle}>Liderança Visionária</h2>
          <p className={styles.sectionSubtitle}>
            Conheça as mentes por trás da inovação na Chromatech.
          </p>
          <div className={styles.teamGrid}>
            {/* 5. O loop agora usa os dados da API (note a mudança para member.id, member.nome, etc.) */}
            {teamMembers.map((member) => (
              <TeamCard 
                key={member.id} 
                name={member.nome} 
                title={member.cargo} 
                imageUrl={member.urlFoto} 
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;