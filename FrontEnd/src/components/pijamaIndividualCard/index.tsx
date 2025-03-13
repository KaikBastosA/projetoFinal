import styles from './styles.module.css'
import subtract from '../../assets/Subtract.svg'
import plus from '../../assets/Plus Math.svg'
import favorite from '../../assets/empty-Heart.svg'
import favoritado from '../../assets/full-heart.svg'
import { useEffect, useState } from 'react'
import useCartStore from '../../stores/CartStore'
import { Pajama } from '../../types/Pajama'
import useFavoriteStore from '../../stores/FavoriteStore'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'

export default function PijamaIndividualCard( pijama: Pajama) {

    const { addFavorite, removeFavorite } = useFavoriteStore()
    const { id } = useParams();
    const [favorito, setFavorito] = useState<boolean>(false)
    const { addToCart } = useCartStore()
    const [quantidade, setQuantidade] = useState(1)
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string | null>(null)
    const navigate = useNavigate()

    function handleClick() {
        navigate('/')
    }

    useEffect(() => {
        if (pijama) {
            setFavorito(pijama.favorite ?? false);
        }
    }, [pijama]);

    const desconto = pijama.sale_percent ?? 0

    const precoComDesconto = pijama.on_sale ? pijama.price * (1 - (desconto / 100)) : pijama.price

    const precoPix = (precoComDesconto * 0.85).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) 
    
    const aumentarQuantidade = () => setQuantidade(quantidade + 1);

    const diminuirQuantidade = () => {
        if(quantidade > 1) {
            setQuantidade(quantidade - 1)
        }
    };

    const toggleFavorito = async () => {
        try {
            const novoFavorito = !favorito;
    
            await api.patch(`/pajama/updateFavorite/${id}`, {
                favorite: novoFavorito,
            }); 

            if (novoFavorito) {
                addFavorite(pijama);
            } else {
                removeFavorite(pijama.id);
            }

            setFavorito(novoFavorito)
    
        } catch (error) {
            console.error("Erro ao atualizar favorito: ", error);
        }
    };

    return (   

        <div className={styles.buyPijama}>
                <img src={pijama.image} alt="pijama" />

                <div className={styles.buyContainer}>
                    <h1>{pijama.name}</h1>
                    <p>Ref: {pijama.id} </p>

                    <div className={styles.priceContainer}>
                        {pijama.on_sale ? (
                            <>
                                <div className={styles.priceComDesconto}>
                                    <h2 className={styles.precoAntigo}>R$ {pijama.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
                                    <div>
                                        <h2 className={styles.precoDesconto}>R$ {precoComDesconto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
                                        <p>6x de <span className={styles.priceSpan}>{(precoComDesconto/6).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> </p>
                                    </div>
                                    
                                </div>
                                <p>Ou por <span className={styles.priceContainerSpan}>R${precoPix}</span> no PIX</p>
                            </>
                        ) : (
                            <>
                                <div className={styles.price}>
                                    <h2>R$ {pijama.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} </h2>
                                    <p>6x de <span className={styles.priceSpan}>{(pijama.price/6).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> </p>
                                </div>
                                <p>Ou por <span className={styles.priceContainerSpan}>R${precoPix}</span> no PIX</p>
                            </>
                        )}
                    </div>

                    <div className={styles.tamanhosContainer}>
                        <h4>Tamanhos:</h4>

                        <div className={styles.tamanhosBotoes}>
                            {pijama.size?.map(({ size }) => 
                                <button
                                    key={size}
                                    className={tamanhoSelecionado === size ? styles.selecionado : ''}
                                    onClick={() => setTamanhoSelecionado(size)}
                                >
                                    {size}
                                </button>
                            )}
                        </div>

                        { tamanhoSelecionado && (
                            <p>Ainda temos{''} <span className={styles.tamanhosContainerSpan}>{pijama.size?.find((item) => item.size === tamanhoSelecionado) ?.stock_quantity ?? 0}</span>{''} peças do tamanho escolhido em nosso estoque</p>
                        )}
                    </div>

                    <div className={styles.quantidadeContainer}>
                        <h4>Quantidade:</h4>

                        <div  className={styles.quantidadeBotoes}>
                            <button className={styles.diminuirBotao} onClick={diminuirQuantidade}>
                                   <img src={subtract} alt="subtract-sign" /> 
                            </button>
                            <span>{quantidade}</span>
                            <button className={styles.aumentarBotao} onClick={aumentarQuantidade} disabled={quantidade >= (pijama.size?.find((item) => item.size === tamanhoSelecionado)?.stock_quantity ?? 0)}>
                                 <img src={plus} alt="plus-sign" /> 
                            </button>
                        </div>
                    </div>  

                    <div className={styles.carrinhoContainer}>

                        <button 
                            className={styles.addCarrinhoBotao}
                            onClick={() => { addToCart({ ...pijama, quantidade, selectedSize: tamanhoSelecionado || undefined}); handleClick(); }}
                            disabled={!tamanhoSelecionado || quantidade < 1 || quantidade > (pijama.size?.find((item) => item.size === tamanhoSelecionado)?.stock_quantity ?? 0)}>
                                ADICIONAR AO CARRINHO
                        </button> 

                        <button className={styles.favoritosBotao} onClick={toggleFavorito}> 
                            <img src={favorito ? favoritado : favorite} alt="heart-icon" /> 
                        </button>

                    </div> 
                                      
                </div>
            </div>
    )
}
