import { Component } from '@angular/core';
import { Ingredient, LinkedProduct } from 'src/app/core/models/ingredients/ingredients.interface';
import { Product } from 'src/app/core/models/order-products/products-interface';
import { IngredientService } from 'src/app/core/services/ingredients/ingredients.service';
import { ProductsOrderService } from 'src/app/core/services/products-order/products-order.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  loadingProducts: boolean = false;
  products!: Product[];
  ingredients!: Ingredient[];
  productsMap!: LinkedProduct[];

  constructor(
    private productsService : ProductsOrderService,
    private ingredientsService : IngredientService,
  ) {
    this.getIngredients();
    this.getProducts();
  }

  getProducts() {
    this.loadingProducts = true;
    this.productsService.getAllProducts().subscribe(res => {
      if(res) {
        this.products = res;
        this.mapProducts();
      }
    })
  }

  getIngredients() {
    this.loadingProducts = true;
    this.ingredientsService.getAllIngredientsAndToppings().subscribe(res => {
      if(res) {
        this.ingredients = res;
      }
    })
  }

  mapProducts() {
    if(this.products && this.ingredients) {
      const linkedProducts = this.products.map(product => {
        const detailProductGrouped = product.detailProduct.map(detail => ({
          ...detail,
          ingredient: this.ingredients.find(ingredient => ingredient.ingredientId === detail.idIngredient) || null
        }));
    
        return {
          ...product,
          salsas: detailProductGrouped.filter(detail => detail.ingredient?.ingredientType.name === 'Salsas'),
          capas: detailProductGrouped.filter(detail => detail.ingredient?.ingredientType.name === 'Capas'),
          toppingsPremium: detailProductGrouped.filter(detail => detail.ingredient?.ingredientType.name === 'Toppings Premium'),
          toppingsClasic: detailProductGrouped.filter(detail => detail.ingredient?.ingredientType.name === 'Toppings Clásicos')
        };
      });
      this.productsMap = linkedProducts;
      this.loadingProducts = false;
      console.log(linkedProducts)
    }else {
      this.mapProducts();
    }
  }
}
