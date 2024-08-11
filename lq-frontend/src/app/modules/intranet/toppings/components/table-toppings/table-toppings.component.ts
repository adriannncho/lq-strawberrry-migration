import { Component, Input, OnInit } from '@angular/core';
import { Ingredient, IngredientType } from 'src/app/core/models/ingredients/ingredients.interface';
import { IngredientService } from 'src/app/core/services/ingredients/ingredients.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-table-toppings',
  templateUrl: './table-toppings.component.html',
  styleUrls: ['./table-toppings.component.css']
})
export class TableToppingsComponent implements OnInit{

  @Input() ingredients!: Ingredient[];
  @Input() loadingIngredients: boolean = false;
  isVisibleModalEdit: boolean = false;
  ingredientModal!: Ingredient;
  typesIngredients!: IngredientType[];

  constructor(
    private ingredientsService : IngredientService,
    private notificationService : NotificationService
  ) {}

  ngOnInit(): void {
    this.getTypeIngredients();
  }

  showModalEdit(ingredient: Ingredient) {
    this.isVisibleModalEdit = true;
    this.ingredientModal = ingredient;
  }

  getTypeIngredients() {
    this.ingredientsService.getTypeIngredients().subscribe(res => {
      if(res) {
        let types = res.filter(fil => fil.active === true);
        this.typesIngredients = types;
      }else {
        this.notificationService.error('No se encontraron tipos de ingredientes', 'Error')
      }
    }, error => {
      this.notificationService.error('Ocurrio un error al obtener los ingredientes', 'Error')
    })
  }
}
