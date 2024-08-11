import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToppingsRoutingModule } from './toppings-routing.module';
import { ToppingsComponent } from './pages/toppings/toppings.component';
@NgModule({
  declarations: [
    ToppingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToppingsRoutingModule,  
  ],
  providers: [],
})
export class ToppingsModule { }