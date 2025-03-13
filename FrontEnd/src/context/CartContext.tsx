import { createContext } from 'react';
import { Pajama } from '../types/Pajama';

interface CartContext {
    cart: Pajama[]
}


const CartContext = createContext<CartContext>({
    cart: []
})

export default CartContext