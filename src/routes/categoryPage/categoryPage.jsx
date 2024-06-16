import "./categoryPage.styles"

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import ProductCard from "../../components/Product Card/productCard";
import {CategoryTitle, Container} from "./categoryPage.styles";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/categories/category.selector";
import {Spinner} from "../../components/Spinner/spinner.component";

function CategoryPage() {
    const {category} = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <CategoryTitle>
                {category.toUpperCase()}
            </CategoryTitle>
            {isLoading
                ? <Spinner />
                : <Container>
                    {products && products.map(product =>
                        <ProductCard key={product.id} product={product} />
                    )}
                </Container>
            }
        </>
    );
}

export default CategoryPage;