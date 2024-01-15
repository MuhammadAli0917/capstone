import "./categoryPreview.styles"

import React from 'react';
import ProductCard from "../Product Card/productCard";
import {Link, useNavigate} from "react-router-dom";
import {Container, Preview, Title} from "./categoryPreview.styles";

function CategoryPreview({title, products}) {



    return (
        <Container>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {products
                    .filter((_, index) => index < 4)
                    .map(product => <ProductCard key={product.id} product={product} />)
                }
            </Preview>
        </Container>
    );
}

export default CategoryPreview;