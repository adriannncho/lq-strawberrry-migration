import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeIntranetComponent } from './pages/home-intranet/home-intranet.component';
import { HomeRoutingModule } from './home-routing.module'
import { SharedModule } from 'src/app/shared/shared.module';
import { TabToppingsComponent } from './components/tab-toppings/tab-toppings.component';
import { ModalResumeOrderComponent } from './components/modal-resume-order/modal-resume-order.component';



@NgModule({
  declarations: [
    HomeIntranetComponent,
    TabToppingsComponent,
    ModalResumeOrderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
