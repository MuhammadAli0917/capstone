import React from 'react';
import "./checkoutItem.styles"
import {Arrow, Container, ImageContainer, Price, Quantity, RemoveButton, Value} from "./checkoutItem.styles";
import {Name} from "../CartItem/cartItem.style";
import {addItemToCart, clearItemFromCart, removeItemFromCart} from "../../store/cart/cart.action";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()




    const clearButtonHolder = () => dispatch(clearItemFromCart(cartItems, cartItem))
    const addItemHolder = () => dispatch(addItemToCart(cartItems, cartItem))
    const removeItemHolder = () => dispatch(removeItemFromCart(cartItems, cartItem))


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