import { useEffect, useState } from 'react';
import axios from 'axios';
import PijamaCard from '../cardPajama';
import styles from './styles.module.css';

interface Pijama {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  season: string;
  type: string;
  gender: string;
  favorite: boolean;
  on_sale: boolean;
  sale_percent: number;
}

export default function PijamasRow() {
  const [pijamas, setPijamas] = useState<Pijama[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3333/all-pajamas')
      .then(response => {
        const onSalePijamas = (response.data as Pijama[]).filter((pijama: Pijama) => pijama.on_sale);
        setPijamas(onSalePijamas);
      })
      .catch(error => {
        console.error('Erro ao buscar pijamas:', error);
      });
  }, []);

  const handleToggleFavorite = (id: string) => {
    setPijamas(prevState =>
      prevState.map(pijama =>
        pijama.id === id ? { ...pijama, favorite: !pijama.favorite } : pijama
      )
    );
  };

  return (
    <div className={styles.rowContainer}>
      {pijamas.slice(0, 3).map(pijama => (
        <PijamaCard
          key={pijama.id}
          pijama={pijama}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
}
