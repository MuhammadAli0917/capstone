import {createSelector} from "reselect";
import {useSelector} from "react-redux";
import {CartState} from "./cart.reducer";
import {RootState} from "../store";

export const selectCartReducer = (state: RootState): CartState => state.cart

export const selectCartItems = createSelector(
    [selectCartReducer],
    cart => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    cart => cart.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((total, item) => (
        total + item.quantity * item.price
    ), 0)
)

