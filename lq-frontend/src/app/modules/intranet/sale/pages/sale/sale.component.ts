import { Component } from '@angular/core';
import { SalesDaily, SalesMonth, SalesWeek } from 'src/app/core/models/sales/sales.interface';
import { SaleService } from 'src/app/core/services/sales/sales.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent {
  loadingSale: boolean = false;
  sales!: number;

  constructor(
    private saleService: SaleService,
  ) { 
    this.getSale()
  }

  getSale() {
    this.loadingSale = true;
      this.saleService.getSale().subscribe(res => {
        this.loadingSale = false;
        if (res) {
          this.sales = res;
        }
      });
  }
}
