import { Component, OnInit } from '@angular/core';
import { OrderResponse, DetailProduct, DetailOrder, Ingredient, DetailAdditional } from 'src/app/core/models/orders/orders.interface';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { OrderService } from 'src/app/core/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersPending!: OrderResponse[];
  loadingOrders: boolean = false;
  renderPageDetail: boolean = false;
  order!: OrderResponse;

  products!: DetailOrder[]
  toppingsClasic!: DetailProduct[];
  toppingsPremium!: DetailProduct[];
  Sauces!: DetailProduct[];
  aditional!: DetailProduct[];

  constructor(
    private orderService : OrderService,
    private notificationService : NotificationService
  ) {}


  ngOnInit(): void {
    this.getOrderPending();
  }

  getOrderPending() {
    this.loadingOrders = true;
    this.orderService.getAllOrdersPendings().subscribe(res => {
      this.loadingOrders = false;
      if(res) {
        this.ordersPending = res;
      }
    })
  }
  
  getOrderById(id: number) {
    this.loadingOrders = true;
    this.orderService.getOrderPending(id).subscribe(
      (res: OrderResponse) => {
        this.loadingOrders = false;
        if (res) {
          // Mapeo de la respuesta
          this.order = this.mapOrderResponse(res);
          this.renderPageDetail = true;
        } else {
          this.notificationService.error('No se encontró el pedido, por favor recargue la página');
          this.renderPageDetail = false;
        }
      },
      (error) => {
        this.loadingOrders = false;
        this.renderPageDetail = false;
        this.notificationService.error('Ocurrió un error al obtener el pedido');
      }
    );
  }

  // Función para mapear la respuesta
  mapOrderResponse(response: OrderResponse): OrderResponse {
    return {
      ...response,
      detailOrders: response.detailOrders.map(detailOrder => {
        const product = detailOrder.product;
        const additionsGrouped = this.groupAdditionsByType(detailOrder.detailAdditionals);

        return {
          ...detailOrder, // Incluye todos los campos de DetailOrder
          product: {
            ...product,
            toppings: {
              classic: additionsGrouped['Toppings Clásicos'],
              premium: additionsGrouped['Toppings Premium'],
              sauces: additionsGrouped['Salsas']
            }
          }
        };
      })
    };
  }

  // Función para agrupar los toppings y salsas por tipo
  groupAdditionsByType(additions: DetailAdditional[]): Record<string, Ingredient[]> {
    const grouped: Record<string, Ingredient[]> = {
      'Toppings Clásicos': [],
      'Toppings Premium': [],
      'Salsas': []
    };

    for (const addition of additions) {
      const typeName = addition.ingredient.ingredientType.name;
      if (grouped[typeName]) {
        grouped[typeName].push(addition.ingredient);
      }
    }

    return grouped;
  }

  updateOrderById(idOrder: number) {
    this.loadingOrders = true;
    this.orderService.updateOrderById(idOrder).subscribe(res => {
      this.notificationService.success('¡Pedido actualizado exitosamente!', 'Éxito');
      window.location.reload();
    }, error => {
      this.loadingOrders = false;
      this.notificationService.error('Ha ocurrido un error al actualizar el pedido. Contacte a Tecnología.')
    });
  }

  cancelUpdate() {
    this.renderPageDetail = false;
  }

}
