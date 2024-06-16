import CategoryPreview from "../../components/Category Preview/categoryPreview";
import "./categories-preview.styles.scss"
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/categories/category.selector";
import {Spinner} from "../../components/Spinner/spinner.component";
const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    return(
        <>
            {isLoading
            ? <Spinner />
            : (Object.keys(categoriesMap).map(title => {
                            const products = categoriesMap[title]
                            return <CategoryPreview products={products} key={title} title={title} />
                        }
                    ))
            }
        </>
    )
}

export default CategoriesPreview