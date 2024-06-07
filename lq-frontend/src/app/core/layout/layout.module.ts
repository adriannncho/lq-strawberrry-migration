import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';

import { NgZorroModule } from '../../shared/modules/ng-zorro.module';
import { BaseComponent } from './components/base/base.component';

@NgModule({
  declarations: [
    NavigationComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule
  ]
})
export class LayoutModule { }
