import styles from './styles.module.css'
import subtract from '../../assets/Subtract.svg'
import plus from '../../assets/Plus Math.svg'
import favorite from '../../assets/favorite-icon.svg'

export default function pijamaIndividual() {
    return(
        <div className={styles.individual}>

            <div className={styles.buyPijama}>
                <img src="https://images.tcdn.com.br/img/img_prod/627000/pijama_longo_americano_em_soft_touch_4747_1_ab4e3e425afb622844a39057f0ecbdcc.jpg" alt="pijama" />

                <div className={styles.buyContainer}>
                    <h1>PIJAMA FEMININO LONGO - ESTAMPA POÁ</h1>
                    <p>Ref: #1234564 </p>

                    <div className={styles.priceContainer}>

                        <div className={styles.price}>
                            <h2>R$ 78,90 </h2>
                            <p>6x de <span className={styles.priceSpan}>R$13,15</span> </p>
                        </div>
                        <p>Ou por <span className={styles.priceContainerSpan}>R$67,06</span> no PIX</p>
                    </div>

                    <div className={styles.tamanhosContainer}>
                        <h4>Tamanhos:</h4>

                        <div className={styles.tamanhosBotoes}>
                            <button>PP</button>
                            <button>P</button>
                            <button>M</button>
                            <button>G</button>
                            <button>GG</button> 
                        </div>
                        <p>Ainda temos <span className={styles.tamanhosContainerSpan}>8</span> peças do tamanho escolhido em nosso estoque</p>
                    </div>

                    <div className={styles.quantidadeContainer}>
                        <h4>Quantidade:</h4>

                        <div  className={styles.quantidadeBotoes}>
                            <button className={styles.diminuirBotao}> <img src={subtract} alt="subtract-sign" /> </button>
                            <span>1</span>
                            <button className={styles.aumentarBotao}> <img src={plus} alt="plus-sign" /> </button>
                        </div>
                    </div>  

                    <div className={styles.carrinhoContainer}>
                       <button className={styles.addCarrinhoBotao}>ADICIONAR AO CARRINHO</button> 
                       <button className={styles.favoritosBotao}> <img src={favorite} alt="heart-icon" /> </button>
                    </div> 
                                      
                </div>
            </div>

            {/*<div>
                <img src="https://images.tcdn.com.br/img/img_prod/627000/pijama_longo_americano_em_soft_touch_4747_1_ab4e3e425afb622844a39057f0ecbdcc.jpg" alt="pijama" />
                <img src="https://images.tcdn.com.br/img/img_prod/627000/pijama_longo_americano_em_soft_touch_4747_1_ab4e3e425afb622844a39057f0ecbdcc.jpg" alt="pijama" />
                <img src="https://images.tcdn.com.br/img/img_prod/627000/pijama_longo_americano_em_soft_touch_4747_1_ab4e3e425afb622844a39057f0ecbdcc.jpg" alt="pijama" />
            </div>*/}
        </div>
    )
}