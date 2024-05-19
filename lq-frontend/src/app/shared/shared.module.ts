import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroModule } from './modules/ng-zorro.module'
import { IconsProviderModule } from './modules/icons-provider.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NgZorroModule,
    IconsProviderModule
  ]
})
export class SharedModule { }
