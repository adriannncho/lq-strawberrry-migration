import { Component, Input } from '@angular/core';
import { LinkedProduct } from 'src/app/core/models/ingredients/ingredients.interface';

@Component({
  selector: 'app-modal-info-product',
  templateUrl: './modal-info-product.component.html',
  styleUrls: ['./modal-info-product.component.css']
})
export class ModalInfoProductComponent {
  @Input() productMap!: LinkedProduct;
  @Input() isVisible: boolean = false;
}
