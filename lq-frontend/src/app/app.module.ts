import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {es_ES, NZ_DATE_LOCALE, NZ_I18N} from 'ng-zorro-antd/i18n';
import {es as DateES} from 'date-fns/locale';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: LOCALE_ID, useValue: 'es_CO'},
    { provide: NZ_DATE_LOCALE, useValue: DateES},
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'COP'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
