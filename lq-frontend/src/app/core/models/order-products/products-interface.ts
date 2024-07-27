export interface DetailProduct {
  idDetailProduct: number;
  idIngredient: number;
  idProduct: number;
  quantity: number;
}

export interface Product {
  idProduct: number;
  size: number;
  name: string;
  description: string;
  value: number;
  quantityClasic: number;
  quantityPremium: number;
  quantitySalsa: number;
  detailProduct: DetailProduct[];
}

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

export interface ProductMap {
  name: string,
  description: string,
  size: string,
  quantityToppingsPremium: number,
  quantityToppingsClasic: number,
  quantitySauces: number,
  price: number
}