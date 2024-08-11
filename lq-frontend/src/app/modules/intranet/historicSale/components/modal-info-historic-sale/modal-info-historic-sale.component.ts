import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponse } from 'src/app/core/models/orders/orders.interface';

@Component({
  selector: 'app-modal-info-historic-sale',
  templateUrl: './modal-info-historic-sale.component.html',
  styleUrls: ['./modal-info-historic-sale.component.css']
})
export class ModalInfoHistoricSaleComponent {
  @Input() ordersCompleted!: OrderResponse;
  @Input() isVisible: boolean = false;
  @Output() hideModalEmitter = new EventEmitter<boolean>()

  hideModalEmit() {
    this.hideModalEmitter.emit(false);
  }
}
