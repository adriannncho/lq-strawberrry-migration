import { DetailProduct } from "../order-products/products-interface";

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

export interface LinkedProduct {
    idProduct: number;
    size: number;
    name: string;
    description: string;
    value: number;
    status: string;
    quantityClasic: number;
    quantityPremium: number;
    quantitySalsa: number;
    salsas: LinkedDetailProduct[];
    capas: LinkedDetailProduct[];
    toppingsPremium: LinkedDetailProduct[];
    toppingsClasic: LinkedDetailProduct[];
  }
  
  export interface LinkedDetailProduct {
    idDetailProduct: number;
    idIngredient: number;
    idProduct: number;
    quantity: number;
    ingredient: Ingredient | null;  // Vinculado con la interfaz Ingredient
  }

  export interface IngredientMapCreate {
    idIngredient: number,
    quantity: number
  }
