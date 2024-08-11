import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToppingsRoutingModule } from './toppings-routing.module';
import { ToppingsComponent } from './pages/toppings/toppings.component';
import { TableToppingsComponent } from './components/table-toppings/table-toppings.component';
import { ModalEditIngredientComponent } from './components/modal-edit-ingredient/modal-edit-ingredient.component';
@NgModule({
  declarations: [
    ToppingsComponent,
    TableToppingsComponent,
    ModalEditIngredientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToppingsRoutingModule,  
  ],
  providers: [],
})
export class ToppingsModule { }