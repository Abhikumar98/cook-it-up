import React from "react";
import styled from "styled-components";
import { Recipe, AppRoutes } from "../../contracts";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

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
    position: relative;
    .overlay {
        opacity: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: black;
        color: white;
        font-size: 1.5rem;
        font-weight: 900;
    }
`;

interface Props {
    readonly data: Recipe;
    readonly index: number;
}

const RecipeItem: React.FC<Props> = (props) => {
    const history = useHistory();

    const { data } = props;

    const routeToRecipeDetails = (id: string) => {
        history.push(AppRoutes.RecipeDetailsPage.replace(":id", id));
    };

    return (
        <motion.div
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        delay: 0.05 * props.index,
                        staggerChildren: 0.1,
                    },
                },
            }}
            initial="hidden"
            animate="visible"
            whileHover={{
                scale: 1.1,
                transition: {
                    delay: 0,
                    staggerChildren: 0.3,
                },
            }}
            whileTap={{ scale: 1.05 }}
        >
            <Container onClick={() => routeToRecipeDetails(data.id)}>
                <div className="image-container">
                    <img src={data.image} alt={data.title} />
                </div>
                <div className="title">{data.title}</div>
                <motion.div
                    whileHover={{
                        opacity: 0.7,
                    }}
                    initial="hidden"
                    animate="visible"
                    className="overlay"
                >
                    Go to Recipe
                </motion.div>
            </Container>
        </motion.div>
    );
};

export default RecipeItem;
