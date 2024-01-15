
import {Fragment, useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import CategoryPreview from "../../components/Category Preview/categoryPreview";
// import "../../components/Shop/shop.style.css"
import "./categories-preview.styles.scss"
const CategoriesPreview = () => {
    const {categories} = useContext(CategoriesContext)

    return(
        <>
            {Object.keys(categories).map(title => {
                    const products = categories[title]
                    return <CategoryPreview products={products} key={title} title={title} />
                }
            )}
        </>
    )
}

export default CategoriesPreview