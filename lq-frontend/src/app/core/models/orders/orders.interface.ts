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

export interface DetailAdditional {
  idDetailAdditional: number;
  idDetailOrder: number;
  idIngredient: number;
}

export interface DetailOrder {
  idDetailOrder: number;
  idOrder: number;
  product: Product;
  nameCustomer: string;
  quantity: number;
  value: number;
  detailAdditionals: DetailAdditional[];
}

export interface Order {
  idOrder: number;
  idUser: number;
  creationDate: string;
  total: number;
  status: string;
  discount: number;
  detailOrders: DetailOrder[];
}