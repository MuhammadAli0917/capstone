import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {setCartItems, setIsCartOpen} from "./cart.action";
import {AnyAction} from "redux";

export type CartState = {
     readonly isCartOpen: boolean,
     readonly cartItems: CartItem[]
}

const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],

}

export const cartReducer = (state = INITIAL_STATE, action = {} as AnyAction): CartState => {


    if (setIsCartOpen.match(action)){
        return {
            ...state,
            isCartOpen: action.payload
        }
    }

    if (setCartItems.match(action)){
        return {
            ...state,
            cartItems: action.payload
        }
    }

    return state
}
