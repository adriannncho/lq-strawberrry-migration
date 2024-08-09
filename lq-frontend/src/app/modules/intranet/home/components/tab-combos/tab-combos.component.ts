import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Combo, DetailProduct } from 'src/app/core/models/combos/combos.interface';
import { ProductMap } from 'src/app/core/models/order-products/products-interface';
import { SizeProducts } from 'src/app/core/utilities/utilities-interfaces';

@Component({
  selector: 'app-tab-combos',
  templateUrl: './tab-combos.component.html',
  styleUrls: ['./tab-combos.component.css']
})
export class TabCombosComponent {

  @Input() combosActive!: Combo[];
  @Input() comboIniciado: boolean = false;
  @Input() comboEnd: boolean = false;
  @Output() intexTab = new EventEmitter<number>();
  @Output() productEmiter = new EventEmitter<ProductMap>();
  @Output() comboSelectedEmit = new EventEmitter<Combo>();

  productsMap!: ProductMap;
  sizes = SizeProducts;
  comboSelect!: Combo;

  changetab() {
    this.intexTab.emit(2);
  }

  mapProduct(product: DetailProduct, combo: Combo) {
    let sizeMap: string = '';
    if(product.size === 1) {
      sizeMap = this.sizes._ID_ONE_;
    }else if (product.size === 2) {
      sizeMap = this.sizes._ID_TWO_;
    }
    this.productsMap = {
      idProduct: product.idProduct,
      name: product.name,
      description: product.description,
      price: product.value,
      detailProduct: [],
      quantitySauces: product.quantitySalsa,
      quantityToppingsClasic: product.quantityClasic,
      quantityToppingsPremium: product.quantityPremium,
      size: product.size,
      sizeMap: sizeMap,
      isCombo: true,
      idCombo: combo.idCombo
    }

    this.productMapEmiter(this.productsMap);
  }

  productMapEmiter(productsMap: ProductMap) {
    this.productEmiter.emit(productsMap);
  }

  chageSelectCombo(combo: Combo) {
    this.combosActive.forEach(item => {
      if(item.idCombo === combo.idCombo) {
        item.isSelect = true;
        this.comboSelect = item;
      }else {
        item.isSelect = false;
      }
    })
    this.comboSelectedEmit.emit(this.comboSelect);
  }
}
