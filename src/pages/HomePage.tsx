import React, { useState } from "react";
import styled from "styled-components";
import { Input, Form, Button, Collapse, Select, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import { motion } from "framer-motion";
import {
    Diets,
    Cuisines,
    FoodTypes,
    FetchRecipesRequest,
    AppRoutes,
} from "../contracts";
import { capitalizeFirstLetter } from "../utils";
import { useHistory } from "react-router-dom";
import background from "../Assests/background.jpg";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background-image: url(${background});
    background-position: center;
    background-size: cover;
    background-origin: initial;
`;
const HeadingText = styled.div`
    font-size: 3rem;
    font-weight: 600;
`;
const BigText = styled.div`
    font-size: 5rem;
    font-weight: 600;
`;
const MediumText = styled.div`
    font-size: 3rem;
`;
const SubHeadingText = styled.div`
    font-size: 1.5rem;
    font-weight: 400;
    margin: 1rem 0;
`;
const TextContainer = styled.div`
    grid-area: text;
    display: flex;
    flex-direction: column;
    padding: 24px;
    justify-content: center;
    background: white;
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
`;
const SearchBoxContainer = styled.div`
    grid-area: search;
    background: white;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    display: flex;
    flex-direction: column;
    padding: 24px;
    justify-content: center;

    .ant-form {
        .search-bar-container {
            .ant-input-affix-wrapper {
                width: 95%;
                height: 2.5rem;
                .ant-input {
                    font-size: 1.2rem;
                    border-radius: 4px;
                }
            }
            .ant-form-item {
                margin: 0;
                width: 100%;
            }
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        .ant-collapse {
            border: none;
            .ant-collapse-item {
                border: none;
                .ant-collapse-content {
                    border: none;
                }
                .ant-collapse-header {
                    background: white;
                    padding: 12px 36px;
                }
            }
        }
    }
`;
const LayoutContainer = styled.div`
    height: calc(100%);
    padding: 5rem;
    width: 70%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "text search";
    @media screen and (max-width: 1024px) {
        height: calc(100%);
        width: 100%;
        padding: 2rem;
    }
    @media screen and (max-width: 991px) {
        height: calc(100%);
        width: 100%;
        padding: 1rem;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: unset;
        grid-template-areas:
            "text"
            "search";
    }
`;

const HomePage = () => {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchRecipes = async (values: Store) => {
        const fetchRecipesRequest = new FetchRecipesRequest();

        fetchRecipesRequest.query = values.query;
        fetchRecipesRequest.type = values.type
            ? values.type.join(",")
            : undefined;
        fetchRecipesRequest.diet = values.diet
            ? values.diet.join(",")
            : undefined;
        fetchRecipesRequest.fillIngredients = false;
        fetchRecipesRequest.includeIngredients = values.includeIngredients
            ? values.includeIngredients.join(",")
            : undefined;
        fetchRecipesRequest.instructionsRequired = false;
        fetchRecipesRequest.cuisine = values.cuisine
            ? values.cuisine.join(",")
            : undefined;
        try {
            setIsLoading(true);
            let queryParams = "";

            Object.keys(fetchRecipesRequest)
                .filter(
                    (i) =>
                        ((fetchRecipesRequest as unknown) as Record<
                            string,
                            string
                        >)[i]
                )
                .forEach((req: any, i: number) => {
                    const value = ((fetchRecipesRequest as unknown) as Record<
                        string,
                        string
                    >)[req];
                    if (value) {
                        queryParams =
                            queryParams +
                            `${i === 0 ? "" : "&"}${req}=${value}`;
                    }
                });

            history.push(
                `${AppRoutes.RecipeListPage}${
                    queryParams.length > 0 ? `?${queryParams}` : ""
                }`
            );
        } catch (error) {
            console.error(error);
            message.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Container>
            <LayoutContainer>
                <TextContainer>
                    <BigText>Welcome to Cook it up</BigText>
                    <SubHeadingText>
                        Cooking more at home? From pantry-friendly recipes to
                        expert cooking advice, we’ve got the tools to help you
                        create order, find your calm, and make the most of your
                        time with loved ones.
                    </SubHeadingText>
                </TextContainer>
                <SearchBoxContainer>
                    <HeadingText style={{ textAlign: "center" }}>
                        Search food
                    </HeadingText>
                    <SubHeadingText
                        style={{ textAlign: "center" }}
                    ></SubHeadingText>
                    <motion.div layoutId="search">
                        <Form
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                            layout="horizontal"
                            onFinish={fetchRecipes}
                            initialValues={undefined}
                        >
                            <div className="search-bar-container">
                                <Form.Item name="query">
                                    <Input allowClear />
                                </Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SearchOutlined />}
                                    disabled={isLoading}
                                    loading={isLoading}
                                >
                                    Search
                                </Button>
                            </div>
                            <Collapse>
                                <Collapse.Panel key="1" header="Filters">
                                    <Form.Item label="Diet" name="diet">
                                        <Select
                                            placeholder="Choose your diet"
                                            mode="multiple"
                                            allowClear
                                        >
                                            {Diets.map((i) => (
                                                <Select.Option
                                                    key={i}
                                                    value={i}
                                                >
                                                    {i}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Cuisine" name="cuisine">
                                        <Select
                                            allowClear
                                            placeholder="Choose your cuisine"
                                            mode="multiple"
                                        >
                                            {Cuisines.map((i) => (
                                                <Select.Option
                                                    key={i}
                                                    value={i}
                                                >
                                                    {i}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Include ingredients"
                                        name="includeIngredients"
                                    >
                                        <Select
                                            allowClear
                                            placeholder="Type ingredients to include"
                                            mode="tags"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Type of food" name="type">
                                        <Select
                                            allowClear
                                            placeholder="Type ingredients to include"
                                            mode="multiple"
                                        >
                                            {FoodTypes.map((i) => (
                                                <Select.Option
                                                    key={i}
                                                    value={i}
                                                >
                                                    {capitalizeFirstLetter(i)}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Collapse.Panel>
                            </Collapse>
                        </Form>
                    </motion.div>
                </SearchBoxContainer>
            </LayoutContainer>
        </Container>
    );
};

export default HomePage;
