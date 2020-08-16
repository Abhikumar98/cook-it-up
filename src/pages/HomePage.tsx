import React, { useState } from "react";
import styled from "styled-components";
import { Input, Form, Button, Collapse, Switch, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import { Diets, Cuisines, FoodTypes } from "../contracts";
import { capitalizeFirstLetter } from "../utils";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: auto;
`;
const HeadingText = styled.div`
    font-size: 3rem;
    font-weight: 600;
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
`;
const SearchBoxContainer = styled.div`
    grid-area: search;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "text search";
    @media screen and (max-width: 1024px) {
        height: calc(100%);
        padding: 2rem;
    }
    @media screen and (max-width: 991px) {
        height: calc(100%);
        padding: 1rem;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: unset;
        grid-template-areas:
            "text"
            "search";
    }
`;

const HomePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchRecipes = async (values: Store) => {
        try {
            console.log(values);
            setIsLoading(true);
            // const response = await fetchRecipes()
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Container>
            <LayoutContainer>
                <TextContainer>
                    <HeadingText>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                    </HeadingText>
                    <SubHeadingText>
                        Tempore quo labore corporis obcaecati quas illum,
                        accusamus rerum Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Tempore quo labore corporis obcaecati
                        quas illum, accusamus rerum
                    </SubHeadingText>
                </TextContainer>
                <SearchBoxContainer>
                    <HeadingText>Search food</HeadingText>
                    <SubHeadingText>Begin something something</SubHeadingText>
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
            </LayoutContainer>
        </Container>
    );
};

export default HomePage;
