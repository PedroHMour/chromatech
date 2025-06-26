import React from 'react';
import Image from 'next/image';
import styles from './SobreNos.module.css';
import TeamCard from '../components/TeamCard';
import { FaBullseye, FaEye, FaHeart } from 'react-icons/fa';


const teamMembers = [
  {
    name: 'Gisele Lima',
    title: 'CEO',
    imageUrl: '/images/team/placeholder-female.jpg', // Usaremos imagens placeholder por enquanto
  },
  {
    name: 'Bruno',
    title: 'CFO',
    imageUrl: '/images/team/placeholder-male-1.jpg',
  },
  {
    name: 'Tony',
    title: 'CTO',
    imageUrl: '/images/team/placeholder-male-2.jpg',
  },
  {
    name: 'Darlan',
    title: 'COO',
    imageUrl: '/images/team/placeholder-male-3.jpg',
  },
];

const AboutUsPage = () => {
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

      {/* Seção de Missão, Visão e Valores */}
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
      
      {/* Seção de Valores */}
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
            {teamMembers.map((member, index) => (
              <TeamCard key={index} name={member.name} title={member.title} imageUrl={member.imageUrl} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;