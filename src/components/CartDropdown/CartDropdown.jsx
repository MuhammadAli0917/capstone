import "./cartDropdown.style"
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";
import {useNavigate} from "react-router-dom";
import {Container, CartItems, EmptyMessage} from "./cartDropdown.style";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate("/checkout")
        dispatch(setIsCartOpen(false))
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