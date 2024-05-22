
import {Route, Routes} from "react-router-dom";
import CategoriesPreview from "../../routes/categories-preview/categories-preview";
import CategoryPage from "../../routes/categoryPage/categoryPage";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase";
import {setCategories, setCategoriesMap} from "../../store/categories/category.action";
import {useDispatch} from "react-redux";

const Shop = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments()
            dispatch(setCategories(categoriesArray))
        }

        getCategoriesMap()
    }, [])

    return(
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<CategoryPage />} />
        </Routes>
    )
}

export default Shop