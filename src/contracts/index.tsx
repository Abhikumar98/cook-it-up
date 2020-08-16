export enum AppRoutes {
    HomePage = "/",
    RecipeListPage = "/recipes",
    RecipeDetailsPage = "/recipe/:id",
    RecipeInstructionsPage = "/recipe/:id/instructions",
}

export class FetchRecipesRequest {
    query = "";
    cuisine?: string;
    diet?: string;
    includeIngredients?: string;
    type?: string;
    instructionsRequired?: boolean;
    fillIngredients?: boolean;
    addRecipeInformation?: boolean;
    ignorePantry = true;
    maxReadyTime?: number;
}

export interface Recipe {
    id: string;
    image: string;
    title: string;
}

export const Diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Whole30",
];
export const Cuisines = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
];

export const FoodTypes = [
    "main course",
    "side dish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
    "soup",
    "beverage",
    "sauce",
    "marinade",
    "fingerfood",
    "snack",
    "drink",
];
