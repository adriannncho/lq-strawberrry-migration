import { Component } from '@angular/core';
import { Ingredient } from 'src/app/core/models/ingredients/ingredients.interface';
import { IngredientService } from 'src/app/core/services/ingredients/ingredients.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.css']
})
export class ToppingsComponent {
  loadingIngredients: boolean = false;
  ingredientes!: Ingredient[];

  constructor(
    private ingredientsService : IngredientService,
    private notificationService : NotificationService
  ) {
    this.getAllToppings();
  }

  getAllToppings() {
    this.loadingIngredients = true;
    this.ingredientsService.getAllIngredientsAndToppings().subscribe(res => {
      this.loadingIngredients = false;
      if(res) {
        this.ingredientes = res;
      }else {
        this.notificationService.error('No se encontraron toppings', 'Error')
      }
    }, error => {
      this.loadingIngredients = false;
      this.notificationService.error('Ocurrrio un error al obtener los ingredients')
    })
  }

}
