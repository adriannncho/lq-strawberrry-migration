import { Component, Input } from '@angular/core';
import { LinkedProduct } from 'src/app/core/models/ingredients/ingredients.interface';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent {
  @Input() productsMap!: LinkedProduct[];
  @Input() loadingProducts: boolean = false;

  isvisibleModal: boolean = false;
  productModal!: LinkedProduct;

  showModal(product: LinkedProduct) {
    this.productModal = product;
    this.isvisibleModal = true;
  }

}
