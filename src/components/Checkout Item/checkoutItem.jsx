import React, {useContext} from 'react';
import "./checkoutItem.styles"
import {CartContext} from "../../contexts/cart.context";
import {Arrow, Container, ImageContainer, Price, Quantity, RemoveButton, SpanCom, Value} from "./checkoutItem.styles";
import {Name} from "../CartItem/cartItem.style";

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext)

    const clearButtonHolder = () => clearItemFromCart(cartItem)
    const addItemHolder = () => addItemToCart(cartItem)
    const removeItemHolder = () => removeItemFromCart(cartItem)


    return (
        <Container>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHolder}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow className="arrow" onClick={addItemHolder}>&#10095;</Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearButtonHolder}>&#10005;</RemoveButton>
        </Container>

    );
}

export default CheckoutItem;