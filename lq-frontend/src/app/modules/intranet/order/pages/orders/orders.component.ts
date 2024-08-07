import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/orders/orders.interface';
import { OrderService } from 'src/app/core/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersPending!: Order[];
  loadingOrders: boolean = false;

  constructor(
    private orderService : OrderService
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
}
