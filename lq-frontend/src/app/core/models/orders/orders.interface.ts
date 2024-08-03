interface DetailProduct {
    idDetailProduct: number;
    idIngredient: number;
    idProduct: number;
    quantity: number;
}

interface Product {
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

interface DetailAdditional {
  idDetailAdditional: number;
  idDetailOrder: number;
  idIngredient: number;
}

interface DetailOrder {
  idDetailOrder: number;
  idOrder: number;
  product: Product;
  nameCustomer: string;
  quantity: number;
  value: number;
  detailAdditionals: DetailAdditional[];
}

interface Order {
  idOrder: number;
  idUser: number;
  creationDate: string;
  total: number;
  status: string;
  discount: number;
  detailOrders: DetailOrder[];
}