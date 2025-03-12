import useFavoriteStore from '../../stores/FavoriteStore'
import styles from './styles.module.css'

export default function Favoritos() {

    const { favorites } = useFavoriteStore()

    return(
        <div>
            <h1>Meus favoritos</h1>
            {favorites.length > 0 ? (
                favorites.map((item) => (
                    <div key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>R$ {item.price.toFixed(2)}</p>
                    </div>
                ))
            ): (
                <p>Você ainda não tem favoritos.</p>
            )}
        </div>
    )
}