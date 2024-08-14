import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/services/auth.service';
import { Combo } from 'src/app/core/models/combos/combos.interface';
import { DetailOrder, Order, Product, ProductMap } from 'src/app/core/models/order-products/products-interface';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ProductsOrderService } from 'src/app/core/services/products-order/products-order.service';
import { SizeProducts, StatusProducts, TypeProducts } from 'src/app/core/utilities/utilities-interfaces';
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
  statusProducts = StatusProducts;

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
  okOrder: boolean = false;
  comboIniciado: boolean = false;
  comboEnd: boolean = false;

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
      this.loadingProducts = false;
      if(res) {
        this.products = res.filter(f => f.status === this.statusProducts.ACTIVO);
        this.productsMap = this.createObjProducts(this.products);
      }else {
        this.notificationService.error('No se encontraron productos disponibles')
      }
    }, (error) => {
      this.loadingProducts = false;
      this.notificationService.error('Ocurrió un error al obtener los productos disponibles.', 'Error');
    })
  }

  createObjProducts(products: Product[]): ProductMap[] {
    let productsForMap: ProductMap[];
    productsForMap = products.map(item => {
      return {
        idProduct: item.idProduct,
        name: item.name,
        description: item.description,
        price: item.value,
        sizeMap: item.sizeDetail.size ? item.sizeDetail.size : 0 ,
        quantitySauces: item.quantitySalsa,
        quantityToppingsClasic: item.quantityClasic,
        quantityToppingsPremium: item.quantityPremium,
        size: item.size ? item.size : 0,
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
    let valueAditional = 1000;
    let valueAdd : number = 0;
    let cont: number = 0;
    detail.forEach(item => {
      total = total + item.value * item.quantity;
      if(item.detailAdditionals) {
        item.detailAdditionals.forEach(element => {
          if(element.isAditional) {
            if(cont > 0) {
              cont = cont + 1;
            }else {
              cont = 1;
            }
            valueAdd = valueAditional * cont;
          }
        })
      }
    });
    this.resumeOrder = {
      idUser: this.idUser,
      detailOrders: detail,
      total: total + valueAdd,
      subTotal: total + valueAdd ,
      discont: 0,
      creationDate: ''
    }
    this.okOrder = true;
  }

  createResumeOrderCombo(detaile: DetailOrder[]) {
    let cont: number = 0;
    let valueAdd: number = 0;
    let valueAditional: number = 1000;
    this.combosActive.forEach(item => {
      detaile.forEach(detail => {
        this.changesCantidadProd(detail.idCombo, detaile)
        if(item.idCombo === detail.idCombo ) {
          item.detailCombos.forEach(element => {
            element.products.forEach(subItem => {
              if(subItem.idProduct === detail.product.idProduct) {
                subItem.isSelect = true;
              }
            });
          });
        }
      });
    });
    let total: number = 0;
    let discont: number = 0;
    let subTotal: number = 0;
    detaile.forEach(item => {
      if(item.detailAdditionals){
        item.detailAdditionals.forEach(element => {
          if(element.isAditional) {
            if(cont > 0) {
              cont = cont + 1;
            }else {
              cont = 1;
            }
          }
        })
      }
      subTotal = subTotal + item.value ;
      discont = subTotal - this.comboSelected.value;
      total = subTotal - discont;
    });
    valueAdd = valueAditional * cont;
    subTotal = subTotal + valueAdd;
    total = total + valueAdd;

    this.resumeOrder = {
      idUser: this.idUser,
      detailOrders: detaile,
      total: total,
      discont: discont,
      subTotal: subTotal,
      creationDate: ''
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
        this.combosActive.forEach(item => {
          item.complete = false;
            item.catProducts = item.detailCombos.length;
              item.catProductsAdd = 0;
              item.complete = false;;
        })
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
    if(this.isCombo) {
      this.restarCombos(index);
    }
    this.resumeOrder.detailOrders.splice(index, 1);
    if(this.resumeOrder.detailOrders.length <= 0) {
      this.hideModal(false);
      this.resetVariables(false);
    }else{
      this.calcTotal();
    }
  }

  calcTotal () {
    let cont: number = 0;
    this.resumeOrder.detailOrders.forEach(item => {
      let valueAdd: number = 0;
      let valueAditional: number = 1000;
      let total: number = 0;
      let discont: number = 0;
      let subTotal: number = 0;
      if(item.detailAdditionals) {
        item.detailAdditionals.forEach(element => {
          if(element.isAditional) {
            if(cont > 0) {
              cont = cont + 1;
            }else {
              cont = 1;
            }
            valueAdd = valueAditional * cont;
          }
        })
      }
      if(this.isCombo) {
        subTotal = subTotal + item.value;
        discont = subTotal - this.comboSelected.value;
        total = subTotal - discont;
      }else {
        subTotal = subTotal + item.value;
        total = total + item.value;
        this.resumeOrder.total = total;
      }
      subTotal = subTotal + valueAdd ;
      total = total + valueAdd;
      this.resumeOrder.total = total;
      this.resumeOrder.subTotal = subTotal;
      this.resumeOrder.discont = discont;
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
    this.okOrder = false;
  }

  restarCombos(index: number | null) {
    if(index) {
      let idProduct = this.resumeOrder.detailOrders[index].product.idProduct;
      this.combosActive.forEach(item => {
        if(item.isSelect) {
          if(item.catProductsAdd && item.catProductsAdd > 0) {
            item.catProductsAdd = item.catProductsAdd -1;
            this.comboEnd = false;
            this.okOrder = false;
          }
          item.complete = false;
          item.detailCombos.forEach(element => {
            element.products.forEach(subItem => {
              if (subItem.idProduct === idProduct) {
                subItem.isSelect = false;
              }
            });
          });
        }
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

  changesCantidadProd(idCombo: number | undefined,detail: DetailOrder[]) {
    this.combosActive.forEach(item => {
      if(item.idCombo === idCombo) {
        if(item.catProductsAdd) {
          item.catProductsAdd = detail.length
        }else {
          item.catProductsAdd = 1
        }
        if(item.catProducts === item.catProductsAdd) {
          this.okOrder = true;
          item.complete = true;
          this.comboIniciado = false;
          this.comboEnd = true;
        }else {
          this.okOrder = false;
          item.complete = false;
          this.comboIniciado = true;
        }
      }
    })

  }
}
