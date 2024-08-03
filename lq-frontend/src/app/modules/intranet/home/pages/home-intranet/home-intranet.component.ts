import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/services/auth.service';
import { DetailOrder, Order, Product, ProductMap } from 'src/app/core/models/order-products/products-interface';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ProductsOrderService } from 'src/app/core/services/products-order/products-order.service';
import { SizeProducts } from 'src/app/core/utilities/utilities-interfaces';

@Component({
  selector: 'app-home-intranet',
  templateUrl: './home-intranet.component.html',
  styleUrls: ['./home-intranet.component.css']
})
export class HomeIntranetComponent {
  products!: Product[]; 
  productsMap!: ProductMap[];
  sizes = SizeProducts;
  loadingProducts: boolean = false;
  blockTabToppings: boolean = true;
  selectedIndex: number = 0;
  renderToppings: boolean = false;
  productSendTab!: ProductMap;
  idUser!: number;
  customerName: string = '';

  resumeOrder!: Order;
  order!:Order;

  isVisibleModal: boolean = false;

  constructor(
    private productsService : ProductsOrderService,
    private authService : AuthService,
    private notificationService : NotificationService
  ) {
    this.getProducts();
    this.getIdUser();
  }

  getProducts() {
    this.loadingProducts = true;
    this.productsService.getAllProducts().subscribe(res => {
      if(res) {
        this.products = res;
        this.productsMap = this.createObjProducts(this.products);
        this.loadingProducts = false;
      }
    }, (error) => {
      this.loadingProducts = false;
      this.notificationService.error('Ocurrio un error al obtener los productos');
    })
  }

  createObjProducts(products: Product[]): ProductMap[] {
    let productsForMap: ProductMap[];
    productsForMap = products.map(item => {
      let size;
      if(item.size === 1) {
        size = this.sizes._ID_ONE_;
      }else if (item.size === 2) {
        size = this.sizes._ID_TWO_;
      }

      return {
        idProduct: item.idProduct,
        name: item.name,
        description: item.description,
        price: item.value,
        sizeMap: size ? size : this.sizes._ID_ONE_,
        quantitySauces: item.quantitySalsa,
        quantityToppingsClasic: item.quantityClasic,
        quantityToppingsPremium: item.quantityPremium,
        size: item.size,
        detailProduct: item.detailProduct
      }
    });
    return productsForMap
  }

  addProduct(product: ProductMap) {
    this.productSendTab = product;
    this.selectedIndex = 1;
    this.blockTabToppings = false;
    this.renderToppings = true;
  }

  getIdUser() {
    this.idUser = this.authService.getIdUser();
  }

  createResumeOrder(detail: DetailOrder[]) {
    let total: number = 0;
    detail.forEach(item => {
      total = total + item.value;
    });
    this.resumeOrder = {
      idUser: this.idUser,
      detailOrders: detail,
      total: total,
    }
  }

  showModal() {
    this.isVisibleModal = true;
  }
}
