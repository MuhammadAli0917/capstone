import {useEffect} from "react";
import "./checkout.styles"
import CheckoutItem from "../../components/Checkout Item/checkoutItem";
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from "./checkout.styles";
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";

const Checkout = () => {
    const totalPrice = useSelector(selectCartTotal)
    const cartItems = useSelector(selectCartItems)

    useEffect(() => {

    }, [])

    return <CheckoutContainer>
        <CheckoutHeader>
            <HeaderBlock>
                <span>Product</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Description</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Quantity</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Price</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Remove</span>
            </HeaderBlock>

        </CheckoutHeader>
            {cartItems.map((item) => <CheckoutItem key={item.id} cartItem={item} />)}
        <Total>Total: ${totalPrice}</Total>
    </CheckoutContainer>
}

export default Checkout


