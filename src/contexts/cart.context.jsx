import {createContext, useEffect, useReducer, useState} from "react";
import {createAction} from "../utils/reducer/reducer";

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}

const initialState = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0
}

const cartReducer = (state, {type, payload}) => {
    switch (type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if(existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const removeCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if (existingCartItem.quantity === 1){
        return cartItems.filter(item => item.id !== existingCartItem.id)
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
    );
}

export const clearItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    return cartItems.filter(item => item.id !== existingCartItem.id)

}





export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    totalPrice: 0
})



export const CartContextProvider = ({children}) => {


    const [{isCartOpen,
        cartItems,
        cartCount,
        totalPrice}, dispatch] = useReducer(cartReducer, initialState)


    const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        const newTotalPrice = cartItems.reduce((total, item) => (
            total + item.quantity * item.price
        ), 0)

        const payload = {
            cartItems,
            cartCount: newCartCount,
            totalPrice: newTotalPrice,
        };

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload))
    }

    const addItemToCart = (product) =>{
        const newCartItems = addCartItem(cartItems, product)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (product) =>{
        const newCartItems = removeCartItem(cartItems, product)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (product) =>{
        const newCartItems = clearItem(cartItems, product)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = bool => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, totalPrice};


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}














