
import "./cartIcon.style"
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {Container, ItemCount, ShoppingIcon} from "./cartIcon.style";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartItems, cartCount} = useContext(CartContext)



    const toggleDropdown = () => setIsCartOpen(!isCartOpen)
    return (
        <Container onClick={toggleDropdown}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </Container>
    )
}

export default CartIcon