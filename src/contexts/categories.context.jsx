import {createContext, useEffect, useState} from "react";

// import SHOP_DATA from "../shop-data.js"
import {getCategoriesAndDocuments} from "../utils/firebase/firebase";

export const CategoriesContext = createContext({
    categories: {},
})

export const CategoriesProvider = ({children}) => {
    const [categories, setCategories] = useState({})

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategories(categoryMap)
        }
        getCategoriesMap()
    }, [])

    const value = {categories}

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}