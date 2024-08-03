export interface DetailProduct {
  idProduct: number;
  size: number;
  name: string;
  description: string;
  value: number;
  quantityClasic: number;
  quantityPremium: number;
  quantitySalsa: number;
  detailProduct: null;
}

export interface DetailCombo {
  idDetailCombo: number;
  idProduct: number;
  idCombo: number;
  products: DetailProduct[];
}

export interface Combo {
  idCombo: number;
  idTypeDiscount: number;
  name: string | null;
  description: string;
  value: number;
  status: string;
  detailCombos: DetailCombo[];
}