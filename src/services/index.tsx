import axios, { AxiosResponse } from "axios";
import { FetchRecipesRequest } from "../contracts";

const fetchRecipesURL = "https://api.spoonacular.com/recipes/";

export const fetchRecipes = async (
    fetchRecipesRequest: FetchRecipesRequest
): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.get(fetchRecipesURL);
        return response.data;
    } catch (error) {
        return Promise.reject();
    }
};
