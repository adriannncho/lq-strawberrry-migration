export interface DetailProduct {
  idDetailProduct: number;
  idIngredient: number;
  idProduct: number;
  quantity: number;
  name: string;
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
  status: string;
  detailProduct: DetailProduct[];
  sizeDetail: DetailSize;
}

export interface DetailSize {
  idTamanio: number;
  size: number;
  typeSize: {
    idTypeTamanio: number;
    name: string,
    abbreviation: string;
  }
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
  isAditional: boolean
}

export interface ProductMap {
  idProduct: number,
  name: string,
  description: string,
  sizeMap: number,
  quantityToppingsPremium: number,
  quantityToppingsClasic: number,
  quantitySauces: number,
  price: number,
  size: number,
  detailProduct: DetailProduct[],

  isCombo?: boolean,
  idCombo?: number,  //Solo front
}

export interface Order {
  idUser: number;
  total: number;
  detailOrders: DetailOrder[];
  discont: number

  subTotal?: number;    // Solo front 
  totalOrder?: number;  // Solo front
}

export interface DetailOrder {
  nameCustomer: string;
  value: number;
  quantity: number;
  product: ProductId;
  detailAdditionals: DetailAdditional[];
  nameProduct: string;                     //Solo uso front
  idCombo?: number;
}

export interface ProductId {
  idProduct: number;
}

export interface DetailAdditional {
  idIngredient: number;
  isAditional: boolean
}

export interface DetailProductMap {
  idIngredient: number;
  quantity: number;
  name: string
  typeId: number
}

export interface DetailProductMapSend {
  idIngredient: number;
  quantity: number;
}

export interface ProductCreateMap {
  size: number;
  name: string;
  description: string;
  value: number;
  quantityClasic: number;
  quantityPremium: number;
  quantitySalsa: number;
  detailProduct: DetailProductMap[];
}

export interface ProductUpdateMap {
  idProduct: number,
  size: number;
  name: string;
  description: string;
  value: number;
  quantityClasic: number;
  quantityPremium: number;
  quantitySalsa: number;
  detailProduct: DetailProductMapSend[];
}

export interface TypeSize {
  idTipoTamanio: number;
  name: string;
  abbreviation: string;
}

export interface ProductSize {
  idTamanio: number;
  size: number;
  typeSize: TypeSize;
}
export interface UpdateProductBody {
  idProduct: number;
  size: number;
  name: string;
  description: string;
  quantityClasic: number;
  quantityPremium: number;
  quantitySalsa: number;
  value: number;
  detailProduct: DetailProductMapSend[];
  status: string
}
export interface CreatedProductBody {
  size: number;
  name: string;
  description: string;
  quantityClasic: number;
  quantityPremium: number;
  quantitySalsa: number;
  value: number;
  detailProduct: DetailProductMapSend[];
  status: string
}