import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgZorroModule } from '../../shared/modules/ng-zorro.module';
import { BaseComponent } from './components/base/base.component';

@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule
  ]
})
export class LayoutModule { }
