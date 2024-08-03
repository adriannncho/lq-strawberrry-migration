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
  checked?: boolean
}

export interface ProductMap {
  idProduct: number,
  name: string,
  description: string,
  sizeMap: string,
  quantityToppingsPremium: number,
  quantityToppingsClasic: number,
  quantitySauces: number,
  price: number,
  size: number,
  detailProduct: DetailProduct[],
}

export interface Order {
  idUser: number;
  total: number;
  detailOrders: DetailOrder[];

  subToatl?: number;    // Solo front
  discont?: number;     // Solo front
  totalOrder?: number;  // Solo front
}

export interface DetailOrder {
  nameCustomer: string;
  value: number;
  quantity: number;
  product: ProductId;
  detailAdditionals: DetailAdditional[];
  nameProduct: string;                     //Solo uso front
}

export interface ProductId {
  idProduct: number;
}

export interface DetailAdditional {
  idIngredient: number;
}