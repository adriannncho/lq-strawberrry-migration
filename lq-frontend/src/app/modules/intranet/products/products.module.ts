import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { ProductsComponent } from './pages/products/products.component';
import { ModalInfoProductComponent } from './components/modal-info-product/modal-info-product.component';
@NgModule({
  declarations: [
    ProductsComponent,
    TableProductsComponent,
    ModalInfoProductComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,  
  ],
  providers: [],
})
export class ProductsModule { }