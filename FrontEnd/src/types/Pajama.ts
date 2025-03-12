export interface Pajama {
    id: string;
    name: string;
    description?: string;
    image: string;
    quantidade?: number;
    price: number;
    season?: string;
    type?: string;
    gender?: string;
    favorite?: boolean;
    onSale?: boolean;
    salePercent?: number;
    size?: {
        id: string;
        stock_quantity: number;
        size: string;
        pajamaId: string;
    }[];
    selectedSize?: string;
}
