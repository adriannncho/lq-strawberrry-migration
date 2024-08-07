import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/services/auth.service';
import { Combo } from 'src/app/core/models/combos/combos.interface';
import { DetailOrder, Order, Product, ProductMap } from 'src/app/core/models/order-products/products-interface';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ProductsOrderService } from 'src/app/core/services/products-order/products-order.service';
import { SizeProducts, TypeProducts } from 'src/app/core/utilities/utilities-interfaces';
import { TabToppingsComponent } from '../../components/tab-toppings/tab-toppings.component';

@Component({
  selector: 'app-home-intranet',
  templateUrl: './home-intranet.component.html',
  styleUrls: ['./home-intranet.component.css']
})
export class HomeIntranetComponent {
  @ViewChild(TabToppingsComponent) topping!: TabToppingsComponent;
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

  typesProducts = TypeProducts;
  resumeOrder!: Order;
  order!:Order;

  isVisibleModal: boolean = false;

  loadingCombos: boolean = false;
  combosActive!: Combo[];
  combosAdded!: Combo[];
  isCombo: boolean = false;
  isProduct: boolean = false;
  comboSelected!: Combo;

  constructor(
    private productsService : ProductsOrderService,
    private authService : AuthService,
    private notificationService : NotificationService
  ) {
    this.getProducts();
    this.getIdUser();
    this.getCombosActive();
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
      this.notificationService.error('Ocurrió un error al obtener los productos disponibles.', 'Error');
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
    this.selectedIndex = 2;
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
      discont: 0
    }
  }

  createResumeOrderCombo(detail: DetailOrder[]) {
    this.combosActive.forEach(item => {
      item.detailCombos.forEach(element => {
        element.products.forEach(subItem => {
          subItem.isSelect = detail.some(detailItem => subItem.idProduct === detailItem.product.idProduct);
        });
      });
    });
    let total: number = 0;
    let discont: number = 0;
    let subTotal: number = 0;
    detail.forEach(item => {
      subTotal = subTotal + item.value;
      discont = subTotal - this.comboSelected.value;
      total = subTotal - discont;
    });

    this.resumeOrder = {
      idUser: this.idUser,
      detailOrders: detail,
      total: total,
      discont: discont,
      subTotal: subTotal
    }
  }

  showModal() {
    this.isVisibleModal = true;
  }

  hideModal(event: boolean) {
    this.isVisibleModal = event;
  }

  getCombosActive() {
    this.loadingCombos = true;
    this.productsService.getCombosActive().subscribe(res => {
      if(res){
        this.combosActive = res;
        this.loadingCombos = false;
      }
    }, error => {
      this.notificationService.error('Ocurrió un error al obtener los combos disponibles.', 'Error')
    })
  }

  changeType(event: boolean) {
    this.isCombo = event;
    this.isProduct = event;
  }

  deleteProductOfOrder(index: number) {
    this.restarCombos(index);
    this.resumeOrder.detailOrders.splice(index, 1);
    
    if(this.resumeOrder.detailOrders.length <= 0) {
      this.hideModal(false);
      this.resetVariables(false);
    }else{
      this.calcTotal();
    }
  }

  calcTotal () {
    this.resumeOrder.detailOrders.forEach(item => {
      let total: number = 0;
      let discont: number = 0;
      let subTotal: number = 0;
      if(this.isCombo) {
        subTotal = subTotal + item.value;
        discont = subTotal - this.comboSelected.value;
        total = subTotal - discont;
        this.resumeOrder.total = total;
        this.resumeOrder.subTotal = subTotal;
        this.resumeOrder.discont = discont;
      }else {
        total = total + item.value;
        this.resumeOrder.total = total;
      }
    });
  }

  resetVariables(isLine: boolean) {
    if(!isLine) {
      this.restarCombos(null)
    }
    let blankVariable: any = null;
    this.resumeOrder = blankVariable;
    this.isVisibleModal = false;
    this.isCombo = false;
    this.isProduct = false;
    this.topping.productsAdd = blankVariable;
  }

  restarCombos(index: number | null) {
    if(index) {
      let idProduct = this.resumeOrder.detailOrders[index].product.idProduct;
      this.combosActive.forEach(item => {
        item.detailCombos.forEach(element => {
          element.products.forEach(subItem => {
            if (subItem.idProduct === idProduct) {
              subItem.isSelect = false;
            }
          });
        });
      });
    }else {
      this.combosActive.forEach(item => {
        item.detailCombos.forEach(element => {
          element.products.forEach(subItem => {
            subItem.isSelect = false;
          });
        });
      });
    }
  }
}
