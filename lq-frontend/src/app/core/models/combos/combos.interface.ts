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

  isSelect?: boolean;
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
  name: string;
  description: string;
  value: number;
  status: string;
  detailCombos: DetailCombo[];

  isSelect?: boolean;  // Solo front
}

export interface DetailComboMap {
  idProduct: number;
}

export interface ComboMap {
  name: string;
  nameDiscount: string;
  description: string;
  value: number;
  detailCombos: DetailComboMap[];
}


export interface ComboUpdateMap {
  idCombo: number;
  name: string;
  nameDiscount: string;
  description: string;
  value: number;
  detailCombos: DetailComboMap[];
}
