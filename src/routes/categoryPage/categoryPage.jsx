import "./categoryPage.styles"

import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {CategoriesContext} from "../../contexts/categories.context";
import ProductCard from "../../components/Product Card/productCard";
import {CategoryTitle, Container} from "./categoryPage.styles";

function CategoryPage() {
    const {category} = useParams()
    const {categories} = useContext(CategoriesContext)
    const [products, setProducts] = useState(categories[category])

    useEffect(() => {
        setProducts(categories[category])
    }, [category, categories])

    return (
        <>
            <CategoryTitle>
                {category.toUpperCase()}
            </CategoryTitle>
            <Container>
                {products && products.map(product =>
                    <ProductCard key={product.id} product={product} />
                )}
            </Container>
        </>
    );
}

export default CategoryPage;