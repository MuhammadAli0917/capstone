import {Route, Routes} from "react-router-dom";
import CategoriesPreview from "../../routes/categories-preview/categories-preview";
import CategoryPage from "../../routes/categoryPage/categoryPage";

const Shop = () => {

    return(
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<CategoryPage />} />
        </Routes>
    )
}

export default Shop