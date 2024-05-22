import Button from "../Button/Button";
import {Footer, Name, Price, ProductCardContainer} from "./productCard.styles";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)

    const addProduct = () => dispatch(addItemToCart(cartItems, product))
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