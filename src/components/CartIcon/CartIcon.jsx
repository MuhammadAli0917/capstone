
import "./cartIcon.style"
import {Container, ItemCount, ShoppingIcon} from "./cartIcon.style";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectIsCartOpen} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";

const CartIcon = () => {

    const isCartOpen = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)
    const dispatch = useDispatch()



    const toggleDropdown = () => dispatch(setIsCartOpen(!isCartOpen))
    return (
        <Container onClick={toggleDropdown}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </Container>
    )
}

export default CartIcon