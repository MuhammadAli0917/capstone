import CategoryPreview from "../../components/Category Preview/categoryPreview";
import "./categories-preview.styles.scss"
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/category.selector";
const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)

    return(
        <>
            {Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title]
                    return <CategoryPreview products={products} key={title} title={title} />
                }
            )}
        </>
    )
}

export default CategoriesPreview