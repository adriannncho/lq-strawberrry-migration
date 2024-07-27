import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeIntranetComponent } from './pages/home-intranet/home-intranet.component';
import { HomeRoutingModule } from './home-routing.module'
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';



@NgModule({
  declarations: [
    HomeIntranetComponent
  ],
  imports: [
    NgZorroModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
