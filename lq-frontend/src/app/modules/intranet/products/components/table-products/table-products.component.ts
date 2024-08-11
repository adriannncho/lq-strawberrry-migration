import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LinkedProduct } from 'src/app/core/models/ingredients/ingredients.interface';
import { CreateProductBody, Ingredient, Product, ProductSize } from 'src/app/core/models/order-products/products-interface';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ProductsService } from 'src/app/core/services/products/product.service';
import { TypeIngredients } from 'src/app/core/utilities/utilities-interfaces';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit{
  @Input() productsMap!: LinkedProduct[];
  @Input() products!: Product[];
  @Input() loadingProducts: boolean = false;
  @Output() changeStatusProductEmit = new EventEmitter<number>();

  isvisibleModal: boolean = false;
  productModal!: LinkedProduct;
  isVisibleModalEdit: boolean = false;
  productEdit!: LinkedProduct;
  sizes!: ProductSize[];
  ingredients!: Ingredient[];
  clasic!: Ingredient[];
  premium!: Ingredient[];
  sauces!: Ingredient[];
  capas!: Ingredient[];
  typesIngredients = TypeIngredients;
  product!: Product;
  loadingUpdate: boolean = false;

  constructor(
    private productsService : ProductsService,
    private notificationService : NotificationService
  ) {

  }

  ngOnInit() {
    this.getSizesAndIngredientes();
  }

  getSizesAndIngredientes() {
    this.productsService.getSizes().subscribe(res => {
      if(res) {
        this.sizes = res;
      }
    })
    this.productsService.getActiveIngredientsAndToppings().subscribe(res => {
      if(res) {
        this.ingredients = res;
        this.mapIngredients();
      }
    })
  }

  mapIngredients() {
    this.clasic = this.ingredients.filter(fil => fil.ingredientType.ingredientTypeId === this.typesIngredients._TOPPINGS_CLASIC_);
    this.premium = this.ingredients.filter(fil => fil.ingredientType.ingredientTypeId === this.typesIngredients._TOPPINGS_PREMIUM_);
    this.sauces = this.ingredients.filter(fil => fil.ingredientType.ingredientTypeId === this.typesIngredients._SAUSES_);
    this.capas = this.ingredients.filter(fil => fil.ingredientType.ingredientTypeId === this.typesIngredients._CAPAS_);
  }

  showModal(product: LinkedProduct) {
    this.productModal = product;
    this.isvisibleModal = true;
  }

  hideModalInfo(hide: boolean) {
    this.isvisibleModal = hide;
  }

  changeStatus(idProduct: number) {
    this.changeStatusProductEmit.emit(idProduct)
  }

  showModalEdit(product: LinkedProduct) {
    this.productEdit = product;
    this.isVisibleModalEdit = true;
  }

  hideModalEdit() {
    this.isVisibleModalEdit = false;
  }

  updateProduct(product: CreateProductBody){
    this.loadingUpdate = true;
    this.productsService.updateProduct(product).subscribe(res => {
      this.notificationService.success('Productos # ' + product.idProduct + ' actualizado correctamente', 'Exito')
      this.loadingUpdate = false;
      setTimeout(()=> {
        window.location.reload()
      },500)
    }, error => {
      this.loadingUpdate = false;
      this.notificationService.error('Ocurrio un error al actualizar el producto, intente mas tarde', 'Error')
    })
  }

}
