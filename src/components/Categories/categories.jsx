import React from 'react';
import Category from "../Category/category";
import "./categories.scss"

const Categories = ({categories}) => {
    return(
        <div className="categories-container">
            {categories.map(category => (
                <Category category={category} />
            ))}
        </div>
    )
}

export default Categories;