import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetRoutingModule } from './intranet-routing.module'
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';
import { HomeModule } from './home/home.module';



@NgModule({
  declarations: [],
  imports: [
    NgZorroModule,
    CommonModule,
    IntranetRoutingModule,
    HomeModule
  ]
})
export class IntranetModule { }
