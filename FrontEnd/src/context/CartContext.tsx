import { createContext } from 'react';
import { Pajama } from '../types/Pajama';

interface CartContext {
    cart?: Pajama[],
    total?: number
}


const CartContext = createContext<CartContext>({})

export default CartContext