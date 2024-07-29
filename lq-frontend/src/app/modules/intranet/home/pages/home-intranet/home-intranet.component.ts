import { Component } from '@angular/core';
import { Product, ProductMap } from 'src/app/core/models/order-products/products-interface';
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

  order = []

  constructor(
    private productsService : ProductsOrderService,
  ) {
    this.getProducts();
  }

  getProducts() {
    this.loadingProducts = true;
    this.productsService.getAllProducts().subscribe(res => {
      if(res) {
        this.products = res;
        this.productsMap = this.createObjProducts(this.products);
        this.loadingProducts = false;
      }
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
}
