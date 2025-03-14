import styles from './styles.module.css';
import emptyHeart from '../../assets/empty-Heart.svg';
import fullHeart from '../../assets/full-heart.svg';
import saleIcon from '../../assets/saleIcon.svg';
import { useNavigate } from 'react-router-dom';

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

interface FavoritoCardProps {
  pijama: Pijama;
  onToggleFavorite: (id: string) => void;
}

export default function FavoritoCard({ pijama, onToggleFavorite }: FavoritoCardProps) {
  const navigate = useNavigate();
  // Em caso de promoção, calcula o preço com desconto
  const discountedPrice = pijama.on_sale
    ? pijama.price - (pijama.price * (pijama.sale_percent / 100))
    : pijama.price;

  // Formatação dos valores para R$
  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className={styles.cardContainer} onClick={() => navigate(`/pijama/${pijama.id}`)}>
      {/* Icones de favorito e promoção */}
      <div className={styles.iconsContainer} onClick={(e) => e.stopPropagation()}>
        {/* Ícone de Favorito (sempre visível) */}
        <button
          className={styles.iconButton}
          onClick={() => {
            console.log('Favorito clicado:', pijama.id);
            onToggleFavorite(pijama.id);
          }}
          aria-label="Favoritar"
        >
          <img
            src={pijama.favorite ? fullHeart : emptyHeart}
            alt="Favoritar"
            className={styles.favoriteIcon}
          />
        </button>

        {/* Ícone de Promoção (visível só se on_sale for true) */}
        {pijama.on_sale && (
          <div className={styles.iconPromo}>
            <img src={saleIcon} alt="Ícone de promoção" />
          </div>
        )}
      </div>

      {/* Imagem do pijama */}
      <div className={styles.imageContainer}>
        <img
          src={pijama.image}
          alt={pijama.name}
          className={styles.pijamaImage}
        />
      </div>

      {/* Retângulo azul com informações */}
      <div className={styles.infoContainer}>
        <h3 className={styles.pijamaName}>{pijama.name}</h3>
        <div className={styles.infoText}>
          {/* Exibir o texto riscado se tiver em promoção */}
          {pijama.on_sale && (
            <p className={styles.oldPrice}>
              <s>{formatPrice(pijama.price)}</s>
            </p>
          )}
          {/* Div que vai aparecer quando não estiver em promoção */}
          {!pijama.on_sale && (
            <div className={styles.noPromo}>
              <p>AAAAAA</p>
            </div>
          )}

          {/* Preço atual */}
          <p className={styles.currentPrice}>
            {formatPrice(discountedPrice)}
          </p>
          
        </div>
      </div>
    </div>
  );
}