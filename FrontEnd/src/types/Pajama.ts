export interface Pajama {
    id: number;
    name: string;
    description?: string;
    image: string;
    quantidade?: number;
    price: number;
    season?: string;
    type?: string;
    gender?: string;
    favorite: boolean;
    onSale: boolean;
    salePercent?: number;
}
