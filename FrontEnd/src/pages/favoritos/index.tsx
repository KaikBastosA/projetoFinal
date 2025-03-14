import useFavoriteStore from '../../stores/FavoriteStore'
import carrinhoClicado from '../../assets/carrinho-de-comprar-icon.svg'
import carrinhoNaoClicado from '../../assets/carrinho-de-compras-cinza-icon.svg'
import favoritoClicado from '../../assets/full-heart.svg'
import emptyFavorite from '../../assets/no-favorites.png'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'
import { Swiper, SwiperSlide } from 'swiper/react';
import '/node_modules/swiper/swiper-bundle.min.css';
import { Navigation } from 'swiper/modules';
import FavoritoCard from '../../components/favoritosCard'

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

    function shoppingButton() {
        navigate('/pijamas/All')
    }

    function handleToggleFavorite(id: string) {
        api.patch(`/pajama/updateFavorite/${id}`, { favorite: false })
            .then(() => {
                fetchFavorites();
            })
            .catch(error => console.error("Erro ao atualizar favorito:", error));
    }

    return(
        <div className={styles.pageContainer}>
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

            <div className={styles.swiperWrapper}>
                {favorites.length > 0 ? (
                    <>
                    <Swiper
                        modules={[Navigation]}
                        loop={false}
                        navigation
                        className={styles.swiperContainer}
                        spaceBetween={5}
                        breakpoints={{
                            1920: { slidesPerView: 10 }, // Telas muito grandes (Full HD e superiores)
                            1600: { slidesPerView: 6 }, // Laptops grandes
                            1440: { slidesPerView: 6 }, // Laptops médios
                            1280: { slidesPerView: 5 }, // Telas um pouco menores
                            1024: { slidesPerView: 4 }, // Tablets grandes
                            768: { slidesPerView: 3 }, // Tablets médios
                            600: { slidesPerView: 2 }, // Celulares grandes
                            480: { slidesPerView: 1 },
                        }}
                    >
                        {favorites.map((item) => {
                            const pijamaCompleto = listaDePijamas.find(p => p.id === item.id);
                            if (!pijamaCompleto) return null; // Se não encontrar, não renderiza nada
                            
                            return (
                                <SwiperSlide key={item.id} className={styles.slide}>
                                    <FavoritoCard
                                        onToggleFavorite={() => handleToggleFavorite(item.id)}
                                        pijama={pijamaCompleto}
                                    />
                                </SwiperSlide>
                            );
                        })
                    }
                    </Swiper>
                  
                    </>
                ) : (
                    <div className={styles.emptyFavorites}>
                        <img src={emptyFavorite} alt="" />
                        <p className={styles.emptyFavoriteText}>Você ainda não possui favoritos.</p>
                        <p>Você pode adicionar um item aos seus favoritos clicando no ícone de coração.</p>
                        <button onClick={shoppingButton}>Conheça nossos produtos</button>
                    </div>
                )}
            </div>
        </div>
    )
}