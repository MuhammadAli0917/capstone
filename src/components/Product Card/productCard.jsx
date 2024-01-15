import Button from "../Button/Button";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {Footer, Name, Price, ProductCardContainer} from "./productCard.styles";

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product
    const {addItemToCart} = useContext(CartContext)

    const addProduct = () => addItemToCart(product)
    return (
            <ProductCardContainer>
                <img src={imageUrl} alt={name}/>
                <Footer>
                    <Name>{name}</Name>
                    <Price>{price}</Price>
                </Footer>
                <Button buttonType="inverted" onClick={addProduct}>Add to card</Button>
            </ProductCardContainer>
    )
}

export default ProductCard