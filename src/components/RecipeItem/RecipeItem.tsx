import React from "react";
import styled from "styled-components";
import { Recipe, AppRoutes } from "../../contracts";
import { useHistory } from "react-router-dom";

const Container = styled.div`
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    overflow: hidden;
    &:hover {
        cursor: pointer;
    }
    .image-container {
        text-align: center;
    }
    img {
        margin: auto;
        width: 100%;
    }
    .title {
        padding: 6px 12px;
        font-size: 1.5rem;
        font-weight: 600;
    }
`;

interface Props {
    readonly data: Recipe;
}

const RecipeItem: React.FC<Props> = (props) => {
    console.log(props);

    const history = useHistory();

    const { data } = props;

    const routeToRecipeDetails = (id: string) => {
        history.push(AppRoutes.RecipeDetailsPage.replace(":id", id));
    };

    return (
        <Container onClick={() => routeToRecipeDetails(data.id)}>
            <div className="image-container">
                <img src={data.image} alt={data.title} />
            </div>
            <div className="title">{data.title}</div>
        </Container>
    );
};

export default RecipeItem;
