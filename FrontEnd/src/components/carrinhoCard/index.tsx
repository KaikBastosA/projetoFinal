import { useState } from 'react';
import useCartStore from '../../stores/CartStore';
import styles from './styles.module.css'
import subtract from '../../assets/Subtract.svg'
import plus from '../../assets/Plus Math.svg'
import closeIcon from '../../assets/Plus Math.svg'

interface CarrinhoCardProps {
    pijama: {
        id: string;
        name: string;
        image: string;
        price: number;
        onSale?: boolean;
        salePercent?: number;
        quantidade: number;
        selectedSize: string;
    }
}

export default function CarrinhoCard( { pijama }: CarrinhoCardProps) {

    const { removeFromCart, updateQuantity } = useCartStore()
    const [quantidade, setQuantidade] = useState(pijama.quantidade)

    const aumentarQuantidade = () => {
        setQuantidade(prev => prev + 1);
        updateQuantity(pijama.id, quantidade + 1);
    };

    const diminuirQuantidade = () => {
        if (quantidade > 1) {
            setQuantidade(prev => prev - 1);
            updateQuantity(pijama.id, quantidade - 1);
        }
    }

    const precoFinal = pijama.onSale 
        ? pijama.price * (1 - (pijama.salePercent ?? 0) / 100)
        : pijama.price;

    return(
        <div className={styles.card}>
            <div className={styles.bookCover}>
                <img src={pijama.image} alt={`Imagem do pijama ${pijama.name}`} />
            </div>
            <div className={styles.about}>
                <div>
                   <h4>{pijama.name}</h4>
                    <p>Ref: {pijama.id}</p> 
                </div>
                <p>R$ {pijama.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>

            <p>R$ {precoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>

            <p>Tamanho: {pijama.selectedSize}</p>
                
                {/* Controles de quantidade */}
                <div className={styles.quantidadeContainer}>
                    <button className={styles.botao} onClick={diminuirQuantidade}>
                        <img src={subtract} alt="Diminuir" />
                    </button>
                    <span>{quantidade}</span>
                    <button className={styles.botao} onClick={aumentarQuantidade}>
                        <img src={plus} alt="Aumentar" />
                    </button>
                </div>

            {/* Botão de remover */}
            <button className={styles.removeButton} onClick={() => removeFromCart(pijama.id)}>
                <img src={closeIcon} alt="Remover" />
            </button>
        </div>
    )
}



