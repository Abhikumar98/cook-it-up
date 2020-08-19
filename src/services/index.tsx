import axios, { AxiosResponse } from "axios";
import { FetchRecipesRequest, Recipe, RecipeDetail } from "../contracts";

const fetchRecipesURL = "https://api.spoonacular.com/recipes/complexSearch";
const fetchRecipeDetailsURL =
    "https://api.spoonacular.com/recipes/{id}/information";

export const getRecipes = async (
    fetchRecipesRequest: FetchRecipesRequest
): Promise<Recipe[]> => {
    try {
        let queryParams = "";
        let url = fetchRecipesURL;

        Object.keys(fetchRecipesRequest).forEach((req: any, i: number) => {
            const value = ((fetchRecipesRequest as unknown) as Record<
                string,
                string
            >)[req];
            if (value) {
                queryParams =
                    queryParams + `${i === 0 ? "" : "&"}${req}=${value}`;
            }
        });

        if (queryParams.length > 0) {
            // url = `${url}?${queryParams}`;
            url = `${url}?${queryParams}&apiKey=cd3085c506154c0bbde6144acb84228e`;
        } else {
            // url = `${url}`;
            url = `${url}?apiKey=cd3085c506154c0bbde6144acb84228e`;
        }

        const response: AxiosResponse<any> = await axios.get(url);
        return response.data.results as Recipe[];
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getRecipeDetails = async (id: string): Promise<RecipeDetail> => {
    try {
        const response: AxiosResponse<RecipeDetail> = await axios.get(
            fetchRecipeDetailsURL.replace("{id}", id) +
                `?apiKey=cd3085c506154c0bbde6144acb84228e`
        );

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
