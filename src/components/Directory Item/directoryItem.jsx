import React from 'react';
import {BackgroundImage, Body, Container} from "./directoryItem.styles";
import {useNavigate} from "react-router-dom";

const DirectoryItem = ({category}) => {

    const navigate = useNavigate()

    const navigateHolder = () => navigate(category.route)

    return <Container key={category.id} >
        <BackgroundImage imageUrl={category.imageUrl}></BackgroundImage>
            <Body onClick={navigateHolder}>
                <h2>{category.title}</h2>
                <p>Shop items</p>
            </Body>
        </Container>
}

export default DirectoryItem;