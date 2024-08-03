import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/core/models/order-products/products-interface';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ProductsOrderService } from 'src/app/core/services/products-order/products-order.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-resume-order',
  templateUrl: './modal-resume-order.component.html',
  styleUrls: ['./modal-resume-order.component.css']
})
export class ModalResumeOrderComponent {

  @Input() isVisible!: boolean;
  @Input() resumeOrder!: Order;
  @Output() hideModalEmiter = new EventEmitter<boolean>();

  loadingCreate: boolean = false;

  constructor(
    private productsService: ProductsOrderService,
    private notificatinService: NotificationService,
  ) {

  }

  hideModal() {
    this.hideModalEmiter.emit(false);
  }

  createOrder(order: Order) {
    let nullVariable : any = {};
    let body: Order = {
      idUser: order.idUser,
      detailOrders: order.detailOrders,
      total: order.total,
    }
    this.loadingCreate = true;
    this.productsService.createOrder(body).subscribe(res => {
      this.loadingCreate = false;
      this.notificatinService.success('Pedido creado exitosamente');
      window.location.reload();
    }, (error => {
      this.notificatinService.error('Ocurrio un error al crear el pedido')
    }))
  }
}
