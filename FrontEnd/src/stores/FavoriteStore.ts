import { create } from "zustand";

interface FavoriteItem {
    id: string;
    name: string;
    image: string;
    price: number;
}

interface FavoriteStore {
    favorites: FavoriteItem[];
    addFavorite: (item: FavoriteItem) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

const useFavoriteStore = create<FavoriteStore>((set, get) => (
    {
        favorites: [],
        addFavorite: (item) => set((state) => ({ favorites: [...state.favorites, item] })),
        removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((fav) => fav.id !== id) })),
        isFavorite: (id) => get().favorites.some((fav) => fav.id === id)         
    }
))

export default useFavoriteStore;