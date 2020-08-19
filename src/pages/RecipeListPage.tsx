import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Button, Select, Form, message, Popover } from "antd";
import {
    Diets,
    Cuisines,
    FoodTypes,
    FetchRecipesRequest,
    Recipe,
    AppRoutes,
} from "../contracts";
import { capitalizeFirstLetter } from "../utils";
import queryString from "query-string";
import { Store } from "antd/lib/form/interface";
import { getRecipes } from "../services";
import RecipeItem from "../components/RecipeItem/RecipeItem";
import { RouteComponentProps, useHistory } from "react-router-dom";
import emptyImage from "../Assests/empty.png";
import loading from "../Assests/loading.gif";
import { useForm } from "antd/lib/form/Form";
import { motion } from "framer-motion";

const SearchBoxContainer = styled.div`
    width: 70%;
    margin: auto;
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
                background: white;
                border: none;
                .ant-collapse-content {
                    border: none;
                    width: 33rem;
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
    .empty {
        width: 30rem;
        margin: auto;
        margin-top: 12rem;
        text-align: center;
        img {
            width: 100%;
        }
    }
`;

const LoadMoreButton = styled(Button)`
    margin: 24px auto;
    display: block;
`;
const ResultContainer = styled(motion.div)`
    padding: 24px;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;
const ResultLayout = styled.div`
    height: calc(100% - 6.9rem);
    overflow: auto;
`;

interface Props extends RouteComponentProps {}

const RecipeList: React.FC<Props> = (props) => {
    const [form] = useForm();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);

    const [recipes, setRecipes] = useState<Recipe[] | null>(
        props.location.state ? (props.location.state as any).results : null
    );

    const arrayKeys = ["type", "diet", "includeIngredients", "cuisine"];

    const constructFiltersFromQS = (qs: string): any => {
        const oldFilters = Object.keys(qs).reduce((final: any, key: any) => {
            let value: string | string[] = ((qs as unknown) as Record<
                string,
                string
            >)[key];

            if (!value) {
                return final;
            }

            value =
                value.split(",").length > 1
                    ? value.split(",")
                    : arrayKeys.includes(key)
                    ? [value]
                    : value;
            final = {
                ...final,
                [key]: value,
            };
            return final;
        }, {});
        return oldFilters;
    };

    const getDefaultQS = () => {
        const parsedQuery = queryString.parse(props.location.search);
        const oldFilters = constructFiltersFromQS(
            (parsedQuery as unknown) as string
        );
        return oldFilters;
    };

    const [filters, setFilters] = useState<any | undefined>(getDefaultQS());

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
                    (req) =>
                        ((fetchRecipesRequest as unknown) as Record<
                            string,
                            string
                        >)[req]
                )
                .forEach((req: any, i: number) => {
                    const value = ((fetchRecipesRequest as unknown) as Record<
                        string,
                        string
                    >)[req];
                    console.log(value);
                    if (value) {
                        queryParams =
                            queryParams +
                            `${i === 0 ? "" : "&"}${req}=${value}`;
                    }
                });
            console.log(queryParams);
            const response = await getRecipes(fetchRecipesRequest);
            setRecipes(response);
            history.push(
                `${AppRoutes.RecipeListPage}${
                    queryParams.length > 0 ? `?${queryParams}` : ""
                }`
            );
        } catch (error) {
            console.error(error);
            history.push(AppRoutes.ErrorPage, {
                error: error,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMoreRecipes = async () => {
        try {
            setIsMoreLoading(true);
            const fetchRecipesRequest = new FetchRecipesRequest();
            fetchRecipesRequest.query = filters.query;
            fetchRecipesRequest.type = filters.type;
            fetchRecipesRequest.diet = filters.diet
                ? filters.diet.join(",")
                : undefined;
            fetchRecipesRequest.fillIngredients = false;
            fetchRecipesRequest.includeIngredients = filters.includeIngredients
                ? filters.includeIngredients.join(",")
                : undefined;
            fetchRecipesRequest.instructionsRequired = false;
            fetchRecipesRequest.cuisine = filters.cuisine
                ? filters.cuisine.join(",")
                : undefined;
            fetchRecipesRequest.offset = recipes?.length;
            const response = await getRecipes(fetchRecipesRequest);
            const allRecipes = recipes ? [...recipes, ...response] : response;
            setRecipes(allRecipes);
        } catch (error) {
            console.error(error);
            history.push(AppRoutes.ErrorPage, {
                error: error,
            });
        } finally {
            setIsMoreLoading(false);
        }
    };

    useEffect(() => {
        const parsedQuery = queryString.parse(props.location.search);
        if (parsedQuery) {
            const oldFilters = constructFiltersFromQS(
                (parsedQuery as unknown) as string
            );
            setFilters(oldFilters);
            fetchRecipes(oldFilters);
        }
    }, []);

    return (
        <Container>
            <motion.div layoutId="search">
                <SearchBoxContainer>
                    <Form
                        labelAlign="left"
                        labelCol={{ span: 7 }}
                        layout="horizontal"
                        onFinish={fetchRecipes}
                        initialValues={filters}
                        form={form}
                    >
                        <div className="search-bar-container">
                            <Form.Item name="query">
                                <Input
                                    allowClear
                                    onPressEnter={() => {
                                        const a = form.getFieldsValue();
                                        console.log(a);
                                    }}
                                />
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
                        <Popover
                            trigger="click"
                            placement="bottomLeft"
                            content={
                                <>
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
                                </>
                            }
                        >
                            <Button type="link">Filters</Button>
                        </Popover>
                    </Form>
                </SearchBoxContainer>
            </motion.div>
            {isLoading ? (
                <div className="empty">
                    <img src={loading} />
                    Looking up your food
                </div>
            ) : recipes && recipes.length > 0 ? (
                <ResultLayout>
                    <ResultContainer>
                        {recipes?.map((i: any, index: number) => (
                            <RecipeItem key={i.id} data={i} index={index} />
                        ))}
                    </ResultContainer>
                    {recipes && recipes.length > 0 && (
                        <LoadMoreButton
                            loading={isMoreLoading}
                            onClick={fetchMoreRecipes}
                        >
                            Load More
                        </LoadMoreButton>
                    )}
                </ResultLayout>
            ) : (
                <div className="empty">
                    <img src={emptyImage} />
                    We couldn't find what you want !!
                </div>
            )}
        </Container>
    );
};

export default RecipeList;
