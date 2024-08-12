import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent} from './pages/sale/sale.component';
import { FormsModule } from '@angular/forms';
import { TableSaleComponent } from './components/table-sale/table-sale.component';


@NgModule({
  declarations: [
    SaleComponent,
    TableSaleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SaleRoutingModule,  
  ],
  providers: [],
})
export class SaleModule { }