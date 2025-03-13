import { create } from "zustand";
import { Pajama } from '../types/Pajama'
import api from "../api/api";

interface FavoriteItem {
    id: string;
    name: string;
    image: string;
    price: number;
}

interface FavoriteStore {
    favorites: FavoriteItem[];
    fetchFavorites: () => Promise<void>;
    addFavorite: (item: FavoriteItem) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

const useFavoriteStore = create<FavoriteStore>((set, get) => (
    {
        favorites: [],
        fetchFavorites: async () => {
            try {
                const response = await api.get<Pajama[]>('/all-pajamas')
                const data = response.data
                const favoritosDaAPI = data.filter((pijama: Pajama) => pijama.favorite)
                set({ favorites: favoritosDaAPI });
            } catch (error) {
                console.error("Erro ao buscar favoritos:", error);
            }
        },
        addFavorite: (item) => set((state) => ({ favorites: [...state.favorites, item] })),
        removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((fav) => fav.id !== id) })),
        isFavorite: (id) => get().favorites.some((fav) => fav.id === id)         
    }
))

export default useFavoriteStore;