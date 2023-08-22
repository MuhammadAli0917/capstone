import React from 'react';
import "./category.scss"

const Category = ({category}) => (
        <div key={category.id} className="category-container">
                <div className="background-image" style={{
                    backgroundImage: `url(${category.imageUrl})`
                }}></div>
                <div className="category-body-container">
                    <h2>{category.title}</h2>
                    <p>Shop items</p>
                </div>
            </div>
);

export default Category;