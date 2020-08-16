import React, { useState } from "react";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Button, Collapse, Select, Form, message } from "antd";
import { Diets, Cuisines, FoodTypes, FetchRecipesRequest } from "../contracts";
import { capitalizeFirstLetter, sampleResponse } from "../utils";
import { Store } from "antd/lib/form/interface";
import { getRecipes } from "../services";
import RecipeItem from "../components/RecipeItem/RecipeItem";

const SearchBoxContainer = styled.div`
    background: white;
    grid-area: search;
    display: flex;
    flex-direction: column;
    padding: 24px;
    padding-bottom: 0;
    justify-content: center;
    position: sticky;
    top: 0;

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

const Container = styled.div`
    height: 100vh;
    width: 100vw;
`;
const ResultContainer = styled.div`
    padding: 24px;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;
const ResultLayout = styled.div`
    height: calc(100% - 6.9rem);
    overflow: auto;
`;

const RecipeList = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchRecipes = async (values: Store) => {
        const fetchRecipesRequest = new FetchRecipesRequest();

        fetchRecipesRequest.query = values.query;
        fetchRecipesRequest.type = values.type;
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
            const response = await getRecipes(fetchRecipesRequest);
        } catch (error) {
            console.error(error);
            message.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Container>
            <SearchBoxContainer>
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
                                        <Select.Option key={i} value={i}>
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
                                        <Select.Option key={i} value={i}>
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
                                >
                                    {FoodTypes.map((i) => (
                                        <Select.Option key={i} value={i}>
                                            {capitalizeFirstLetter(i)}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Collapse.Panel>
                    </Collapse>
                </Form>
            </SearchBoxContainer>
            <ResultLayout>
                <ResultContainer>
                    {sampleResponse.map((i: any) => (
                        <RecipeItem key={i.id} data={i} />
                    ))}
                </ResultContainer>
            </ResultLayout>
        </Container>
    );
};

export default RecipeList;
