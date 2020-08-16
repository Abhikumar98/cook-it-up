import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getRecipeDetails } from "../services";
import { message } from "antd";
import { RecipeDetail } from "../contracts";
import { sample, capitalizeFirstLetter } from "../utils";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 24px;
`;
const DetailsContainer = styled.div`
    display: grid;
    height: calc(100%);
    grid-template-areas: "left right";
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
`;
const LeftSideContents = styled.div`
    height: calc(100% - 0rem);
    overflow: auto;
    padding: 24px;
    grid-area: left;
    .image-title {
        position: sticky;
        top: 0;
        background: white;
        .image-container {
            width: 100%;
            overflow: hidden;
            text-align: center;
        }
        .title-time {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title,
            .time {
                font-size: 2rem;
                font-weight: 600;
                color: black;
            }
        }
        .arthur-details {
            margin-bottom: 12px;
        }
    }
    .chip-container {
        display: flex;
        flex-wrap: wrap;
        .chip {
            margin: 6px 3px;
            height: 1.5rem;
            border-radius: 6px;
            display: flex;
            align-items: center;
            padding: 6px;
            width: fit-content;
            color: white;
            &.one {
                background-color: dodgerblue;
            }
            &.two {
                background-color: #00843c;
            }
            &.three {
                background-color: #e05746;
            }
        }
    }
`;
const RightSideContents = styled.div`
    height: calc(100% - 0rem);
    overflow: auto;
    padding: 24px;
    grid-area: right;
    background: pink;
`;

type TParams = { id: string };

interface Props extends RouteComponentProps<TParams> {}

const RecipeDetails: React.FC<Props> = (props) => {
    const [recipeDetails, setRecipeDetails] = useState<RecipeDetail | null>(
        null
    );
    const fetchRecipeDetails = async () => {
        try {
            const recipeId = props.match.params.id;
            // const response = await getRecipeDetails(recipeId);
            // console.log(response);
            // setRecipeDetails(response);
            setRecipeDetails(JSON.parse(sample));
        } catch (error) {
            console.error(error);
            message.error(error.message);
        }
    };

    console.log("===> ", recipeDetails);
    useEffect(() => {
        fetchRecipeDetails();
    }, []);

    return (
        <Container>
            <DetailsContainer>
                <LeftSideContents>
                    <div className="image-title">
                        <div className="image-container">
                            <img
                                src={recipeDetails?.image}
                                alt={recipeDetails?.title}
                            />
                        </div>
                        <div className="title-time">
                            <div className="title">{recipeDetails?.title}</div>
                            <div className="time">
                                {recipeDetails?.readyInMinutes} mins
                            </div>
                        </div>
                        <div className="arthur-details">
                            By{" "}
                            <a href={recipeDetails?.sourceUrl}>
                                {recipeDetails?.creditsText}
                            </a>
                        </div>
                    </div>
                    <div className="chip-container">
                        {recipeDetails?.cuisines.map((i) => (
                            <div key={i} className="chip one">
                                {capitalizeFirstLetter(i)}
                            </div>
                        ))}
                        {recipeDetails?.diets.map((i) => (
                            <div key={i} className="chip two">
                                {capitalizeFirstLetter(i)}
                            </div>
                        ))}
                        {recipeDetails?.dishTypes.map((i) => (
                            <div key={i} className="chip three">
                                {capitalizeFirstLetter(i)}
                            </div>
                        ))}
                    </div>
                    <div className="summary">{recipeDetails?.summary}</div>
                </LeftSideContents>
                <RightSideContents></RightSideContents>
            </DetailsContainer>
        </Container>
    );
};

export default withRouter(RecipeDetails);
