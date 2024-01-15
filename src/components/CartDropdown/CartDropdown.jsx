import "./cartDropdown.style"
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {Link, useNavigate} from "react-router-dom";
import {Container, CartItems, EmptyMessage} from "./cartDropdown.style";

const CartDropdown = () => {
    const {cartItems, setIsCartOpen, isCartOpen} = useContext(CartContext)

    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate("/checkout")
        setIsCartOpen(false)
    }

    return (
        <Container>
            <CartItems>
                {cartItems.length ?
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                    : <EmptyMessage>Your car is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </Container>
    )
}

export default CartDropdown