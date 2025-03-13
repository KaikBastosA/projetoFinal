import useFavoriteStore from '../../stores/FavoriteStore'
import carrinhoClicado from '../../assets/carrinho-de-comprar-icon.svg'
import carrinhoNaoClicado from '../../assets/carrinho-de-compras-cinza-icon.svg'
import favoritoClicado from '../../assets/full-heart.svg'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardPajama from '../../components/cardPajama'
import api from '../../api/api'

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

export default function Favoritos() {

    const { favorites, fetchFavorites } = useFavoriteStore()
    const navigate = useNavigate() 
    const [ carrinhoAtivo, setCarrinhoAtivo] = useState(false)
    const [listaDePijamas, setListaDePijamas] = useState<Pijama[]>([])

    useEffect(() => {
        api.get<Pijama[]>('/all-pajamas')
            .then(response => {
                setListaDePijamas(response.data);
            })
            .catch(error => console.error("Erro ao buscar pijama:", error));
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, []);

    function handleClick() {
        setCarrinhoAtivo(true)
        navigate('/carrinho')
    }

    function handleToggleFavorite(id: string) {
        // Adicione a lógica para alternar o favorito
        console.log("Toggling favorite for:", id);
    }

    return(
        <div>
            <div className={styles.nav}>
                <button onClick={handleClick} className={styles.carrinhoBotao}>
                    <img src={carrinhoAtivo ? carrinhoClicado : carrinhoNaoClicado} alt="" />
                    Carrinho
                </button>
                <button className={styles.favoritoBotao}>
                    <img src={favoritoClicado} alt="" />
                    Favoritos
                </button>
            </div>
            <div className={styles.container}>
                {favorites.length > 0 ? (
                    favorites.map((item) => {
                        const pijamaCompleto = listaDePijamas.find(p => p.id === item.id); 

                        if (!pijamaCompleto) return null; // Se não encontrar, não renderiza nada

                        return (
                            <div className={styles.box} key={item.id}>
                                <CardPajama onToggleFavorite={() => handleToggleFavorite} pijama={pijamaCompleto} />
                            </div>
                        );
                    })
                ) : (
                    <p>Você ainda não tem favoritos.</p>
                )}
            </div>
        </div>
    )
}