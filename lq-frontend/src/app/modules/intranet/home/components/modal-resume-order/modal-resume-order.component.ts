import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/core/models/order-products/products-interface';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ProductsOrderService } from 'src/app/core/services/products-order/products-order.service';
import { Combo } from 'src/app/core/models/combos/combos.interface';
import { format } from 'date-fns';

@Component({
  selector: 'app-modal-resume-order',
  templateUrl: './modal-resume-order.component.html',
  styleUrls: ['./modal-resume-order.component.css']
})
export class ModalResumeOrderComponent {

  @Input() isVisible!: boolean;
  @Input() resumeOrder!: Order;
  @Input() combo!: Combo;
  @Input() okOrder: boolean = false;
  @Output() hideModalEmiter = new EventEmitter<boolean>();
  @Output() deleteProductEmitter = new EventEmitter<number>();
  @Output() resetVariablesEmit = new EventEmitter<boolean>();

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
    const formattedDateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    let body: Order = {
      idUser: order.idUser,
      detailOrders: order.detailOrders,
      total: order.total,
      discont: order.discont ?  order.discont : 0,
      creationDate: formattedDateTime
    }
    this.loadingCreate = true;
    this.productsService.createOrder(body).subscribe(res => {
      this.loadingCreate = false;
      this.notificatinService.success('Pedido creado exitosamente');
      this.resetVariables(false);
    }, (error => {
      this.loadingCreate = false;
      this.notificatinService.error('Ocurrio un error al crear el pedido, intente cerrando sesión e ingresando nuevamente')
    }))
  }

  deleteProduct(index: number) {
    this.deleteProductEmitter.emit(index)
  }

  resetVariables(isLine: boolean) {
    this.resetVariablesEmit.emit(isLine)
  }
}
