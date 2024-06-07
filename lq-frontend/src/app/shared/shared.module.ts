import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroModule } from './modules/ng-zorro.module'
import { IconsProviderModule } from './modules/icons-provider.module'
import { LayoutModule } from '../core/layout/layout.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NgZorroModule,
    IconsProviderModule,
    LayoutModule
  ]
})
export class SharedModule { }
