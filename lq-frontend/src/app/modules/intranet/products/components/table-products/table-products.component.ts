import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LinkedProduct } from 'src/app/core/models/ingredients/ingredients.interface';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent {
  @Input() productsMap!: LinkedProduct[];
  @Input() loadingProducts: boolean = false;
  @Output() changeStatusProductEmit = new EventEmitter<number>()

  isvisibleModal: boolean = false;
  productModal!: LinkedProduct;

  showModal(product: LinkedProduct) {
    this.productModal = product;
    this.isvisibleModal = true;
  }

  hideModalInfo(hide: boolean) {
    this.isvisibleModal = hide;
  }

  changeStatus(idProduct: number) {
    this.changeStatusProductEmit.emit(idProduct)
  }

}
