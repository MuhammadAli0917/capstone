import "./cartItem.style"
import {CartItemContainer, ItemDetails, Name} from "./cartItem.style";

const CartItem = ({cartItem}) => {
    const {name, quantity, price, imageUrl} = cartItem
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <ItemDetails>
                <Name>{name}</Name>
                <span className="price">{quantity}x${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem