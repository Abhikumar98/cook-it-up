import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { getRecipeDetails } from "../services";
import { message, Dropdown, Menu, Button, Checkbox } from "antd";
import { RecipeDetail, AppRoutes } from "../contracts";
import { sample, capitalizeFirstLetter } from "../utils";
import Modal from "antd/lib/modal/Modal";

import "./modal.scss";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 24px;
    @media screen and (max-width: 991px) {
        padding: 0;
    }
`;
const DetailsContainer = styled.div`
    display: grid;
    height: calc(100%);
    grid-template-areas: "left right";
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    @media screen and (max-width: 991px) {
        height: calc(100%);
        padding: 0;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: unset;
        grid-template-areas:
            "left"
            "right";
    }
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
    .wine-container {
        margin: 12px 0;
        color: black;
        .section-heading {
            font-size: 1.2rem;
        }
        .text {
        }
        .wine {
            width: 10rem;
            height: fit-content;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
        }
    }
    @media screen and (max-width: 991px) {
        height: 100vh;
        overflow: unset;
        padding: 12px;
    }
`;
const RightSideContents = styled.div`
    height: calc(100% - 0rem);
    overflow: auto;
    padding: 24px;
    grid-area: right;

    .section-heading {
        font-size: 1.2rem;
        color: black;

        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
    }

    .ingredients-container {
        display: flex;
        flex-direction: column;
        margin: 24px 0;
        .ingredient {
            display: grid;
            grid-template-columns: 1fr 7rem;
            height: 2rem;
            align-items: center;
            border: 1px solid #e8e8e8;
            border-radius: 4px;
            margin: 3px 0;
            padding: 0 4px;
        }
    }
    .instructions {
        .section-heading {
            font-size: 1.2rem;
        }
    }
    @media screen and (max-width: 991px) {
        height: 100vh;
        overflow: unset;
        padding: 12px;
    }
`;

type TParams = { id: string };

interface Props extends RouteComponentProps<TParams> {}

const RecipeDetails: React.FC<Props> = (props) => {
    const [recipeDetails, setRecipeDetails] = useState<RecipeDetail | null>(
        null
    );

    const [analysedInstructionTitle, setAnalysedInstructionTitle] = useState<
        string | null
    >(null);

    const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState<
        boolean
    >(false);

    const openInstructionsModal = () => setIsInstructionsModalOpen(true);
    const hideInstructionsModal = () => setIsInstructionsModalOpen(false);

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
            <Link to={{ pathname: AppRoutes.RecipeListPage }}>
                <Button type="link">Back</Button>
            </Link>
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
                    {recipeDetails &&
                        recipeDetails.winePairing &&
                        recipeDetails.winePairing.pairedWines &&
                        recipeDetails.winePairing.pairedWines.length > 0 && (
                            <div className="wine-container">
                                <div className="section-heading">
                                    Wine Pairings
                                </div>
                                <div className="text">
                                    {recipeDetails?.winePairing.pairingText}
                                </div>
                                {recipeDetails?.winePairing.productMatches.map(
                                    (wine: any) => (
                                        <a href={wine.link}>
                                            <div className="wine">
                                                <img
                                                    src={wine.imageUrl}
                                                    alt=""
                                                />
                                                {wine.title}
                                            </div>
                                        </a>
                                    )
                                )}
                            </div>
                        )}
                </LeftSideContents>
                <RightSideContents>
                    <div className="section-heading">
                        Ingredients{" "}
                        <div className="instructions">
                            <div className="section-heading">
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            {recipeDetails?.analyzedInstructions.map(
                                                (i, index) => (
                                                    <Menu.Item
                                                        key={index}
                                                        onClick={() => {
                                                            openInstructionsModal();
                                                            setAnalysedInstructionTitle(
                                                                i.name
                                                            );
                                                        }}
                                                    >
                                                        {i.name}
                                                    </Menu.Item>
                                                )
                                            )}
                                        </Menu>
                                    }
                                >
                                    <Button type="primary">Instructions</Button>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="ingredients-container">
                        {recipeDetails?.extendedIngredients.map(
                            (ingredient) => (
                                <div key={ingredient.id} className="ingredient">
                                    {capitalizeFirstLetter(
                                        ingredient.originalName
                                    )}
                                    <div className="quantity">
                                        {ingredient.amount} {ingredient.unit}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </RightSideContents>
            </DetailsContainer>
            <Modal
                centered
                destroyOnClose
                className="instructions-modal"
                title={analysedInstructionTitle}
                closable
                visible={isInstructionsModalOpen}
                onCancel={hideInstructionsModal}
                onOk={hideInstructionsModal}
                okText="Done"
                cancelText="Close"
            >
                {recipeDetails?.analyzedInstructions
                    .filter((i) => i.name === analysedInstructionTitle)
                    .map((value) =>
                        value.steps.map((step, index) => (
                            <CheckboxInstruction
                                key={`${index}${step}`}
                                value={step.step}
                            />
                        ))
                    )}
            </Modal>
        </Container>
    );
};

interface InstructionsProps {
    readonly value: string;
    readonly quantity?: string;
}

const CheckboxInstruction: React.FC<InstructionsProps> = (props) => {
    const [checked, setChecked] = useState<boolean>(false);

    return (
        <div className="instruction-item">
            <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className={`checkbox ${checked ? "checked" : ""}`}
            >
                {props.value} {props.quantity}
            </Checkbox>
        </div>
    );
};

export default withRouter(RecipeDetails);
