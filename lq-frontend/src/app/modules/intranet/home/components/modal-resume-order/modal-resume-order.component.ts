import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DetailOrder, Order } from 'src/app/core/models/order-products/products-interface';
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
  @Output() editProductEmitter = new EventEmitter<number>();
  @Output() productEditEmitter = new EventEmitter<DetailOrder>();

  productOfEdit!: DetailOrder;
  loadingCreate: boolean = false;

  constructor(
    private productsService: ProductsOrderService,
    private notificatinService: NotificationService,
  ) {}

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
      creationDate: formattedDateTime,
      observation: order.observation
    }
    this.loadingCreate = true;
    this.productsService.createOrder(body).subscribe(res => {
      const idOrder = res;
      this.getPdfOrder(idOrder);
      this.notificatinService.success('Pedido creado exitosamente');
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

  editProduct(product: DetailOrder, index:number) {
    this.editProductEmitter.emit(index);
    this.productEditEmitter.emit(product);
  }

  getPdfOrder(idOrder: number) {
    this.productsService.getTicketOrder(idOrder).subscribe(res => {
      const blob = new Blob([res], { type: 'application/pdf' });
      const fileURL = window.URL.createObjectURL(blob);
  
      // Crear un iframe temporalmente
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none'; // Ocultamos el iframe
      iframe.src = fileURL; // Asignamos el PDF al iframe
      document.body.appendChild(iframe); // Añadir el iframe al DOM
  
      // Esperamos a que el PDF se cargue en el iframe y luego llamamos a print
      iframe.onload = () => {
        iframe.contentWindow?.focus(); // Damos el foco al contenido del iframe
        iframe.contentWindow?.print(); // Ejecutamos la impresión
      };
  
      this.resetVariables(false); // Ejecutamos el método adicional que mencionas
    });
  }
  
}
