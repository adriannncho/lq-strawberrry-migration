import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DetailOrder, Ingredient, OrderResponse } from 'src/app/core/models/orders/orders.interface';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {

  @Input() order!: OrderResponse;
  @Input() detailOrders!: DetailOrder[];
  @Output() updateEmit = new EventEmitter<number>()
  @Output() cancelEmitter = new EventEmitter<boolean>()

  isLastElement(topping: Ingredient, array: Ingredient[]): boolean {
    return array.indexOf(topping) === array.length - 1;
  }

  updateOrder(idOrder: number) {
    this.updateEmit.emit(idOrder);
  }

  cancelEmit() {
    this.cancelEmitter.emit(true);
  }
}
