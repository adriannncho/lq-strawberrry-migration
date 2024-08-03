export interface IngredientType {
    ingredientTypeId: number;
    name: string;
    active: boolean;
}

export interface Ingredient {
    ingredientId: number;
    ingredientType: IngredientType;
    name: string;
}

export interface IngredientMap {
    ingredientType: IngredientType;
    name: string;
}

export interface IngredientTypeMap {
    name: string;
    active: boolean;
}

export interface IngredientUpdateMap {
    ingredientId: number;
    ingredientType: number;
    name: string;
    active: boolean
}
