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

export interface WinePairing {
    pairedWines: string[];
    pairingText: string;
    productMatches: ProductMatch[];
}

export interface ProductMatch {
    id: string;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    averageRating: string;
    ratingCount: string;
    score: string;
    link: string;
}

export interface RecipeDetail {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    lowFodmap: boolean;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    spoonacularScore: number;
    healthScore: number;
    creditsText: string;
    sourceName: string;
    pricePerServing: number;
    extendedIngredients: ExtendedIngredient[];
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    image: string;
    imageType: string;
    summary: string;
    cuisines: string[];
    dishTypes: string[];
    diets: string[];
    occasions: any[];
    winePairing: WinePairing;
    instructions: string;
    analyzedInstructions: AnalyzedInstruction[];
    originalId?: any;
}

export interface AnalyzedInstruction {
    name: string;
    steps: Step[];
}

export interface Step {
    number: number;
    step: string;
    ingredients: (Ingredient | Ingredient)[];
    equipment: Ingredient[];
    length?: Length;
}

export interface Length {
    number: number;
    unit: string;
}

export interface Ingredient {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}

export interface ExtendedIngredient {
    id?: number;
    aisle: string;
    image?: string;
    consistency?: string;
    name: string;
    original: string;
    originalString: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    metaInformation: string[];
    measures: Measures;
}

export interface Measures {
    us: Us;
    metric: Us;
}

export interface Us {
    amount: number;
    unitShort: string;
    unitLong: string;
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
