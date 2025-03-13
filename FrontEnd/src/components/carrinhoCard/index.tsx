import { useState } from 'react';
import useCartStore from '../../stores/CartStore';
import styles from './styles.module.css'
import subtract from '../../assets/Subtract.svg'
import plus from '../../assets/Plus Math.svg'
import closeIcon from '../../assets/close-icon.svg'

interface CarrinhoCardProps {
    pijama: {
        id: string;
        name: string;
        image: string;
        price: number;
        on_sale?: boolean;
        sale_percent?: number;
        quantidade: number;
        selectedSize: string;
        size: {
            id: string;
            stock_quantity: number;
            size: string;
            pajamaId: string;
        }[];
    }
}

export default function CarrinhoCard( { pijama }: CarrinhoCardProps) {

    const tamanhoSelecionado = pijama.selectedSize;
    const tamanhoInfo = pijama.size?.find(item => item.size === tamanhoSelecionado);

    const { removeFromCart, updateQuantity } = useCartStore()
    const [quantidade, setQuantidade] = useState(pijama.quantidade)

    const precoComDesconto = pijama.on_sale ? pijama.price * (1 - ((pijama.sale_percent ?? 0)/ 100)) : pijama.price

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

    return(
        <div className={styles.card}>

            <div className={styles.pijamaImage}>
                <img src={pijama.image} alt={`Imagem do pijama ${pijama.name}`} />
            </div>

            <div className={styles.about}>
                <div>
                    <h4>{pijama.name}</h4>
                    <p>Ref: {pijama.id}</p> 
                </div>
                    <button>{pijama.selectedSize}</button>
            </div>

            <div className={styles.priceContainer}>
                <div className={styles.quantidadeContainer}>
                    <h4>Quantidade:</h4>
                    <div className={styles.quantidadeBotao}>
                        <button className={styles.diminuirBotao} onClick={diminuirQuantidade}>
                            <img src={subtract} alt="Diminuir" />
                        </button>
                        <span>{quantidade}</span>
                        <button className={styles.aumentarBotao} onClick={aumentarQuantidade} disabled={quantidade >= (tamanhoInfo?.stock_quantity ?? 0)}>
                            <img src={plus} alt="Aumentar" />
                        </button>
                    </div>
                    <p>Não perca sua oportunidade! Há apenas mais <span>{tamanhoInfo?.stock_quantity ?? 0}</span> peças disponíveis!</p>
                </div>
                {pijama.on_sale ? (
                    <div className={styles.precoComDesconto}>
                        <p className={styles.precoAntigo}>R$ {pijama.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <p className={styles.precoDesconto}>R${precoComDesconto.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                    </div>
                ) : (
                    <p>R$ {pijama.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                )}
            </div>

                <div className={styles.removeContainer}>
                    <button className={styles.removeButton} onClick={() => removeFromCart(pijama.id)}>
                        <img src={closeIcon} alt="Remover" />
                    </button>
                </div>
        </div>
    )
}



