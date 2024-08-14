import { Component } from '@angular/core';
import { SaleService } from 'src/app/core/services/sales/sales.service';
import { TypeFilterDateSales } from 'src/app/core/utilities/utilities-interfaces';
import { format } from 'date-fns';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { SalesDaily, SalesMonth, SalesWeek } from 'src/app/core/models/sales/sales.interface';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent {
  loadingSale: boolean = false;
  typesCardsSales = TypeFilterDateSales;
  indexCardName: string = this.typesCardsSales._05_TOTAL_;
  sales: number = 0;
  salesDay!: SalesDaily;
  salesWeek!: SalesWeek;
  salesMoth!: SalesMonth;
  salesFilter: number = 0

  constructor(
    private saleService: SaleService,
    private notificationService : NotificationService
  ) { 
    this.getTotalSale()
  }

  getTotalSale() {
    this.loadingSale = true;
      this.saleService.getSale().subscribe(res => {
        this.loadingSale = false;
        if (res) {
          this.sales = res;
        }
      });
  }

  getDaySales() {
    this.indexCardName = this.typesCardsSales._01_VENTA_DIARIA_;
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    this.loadingSale = true;
    this.saleService.getSaleDaily(formattedDate).subscribe(res => {
      console.log(res)
      if(res) {
        this.salesDay = this.salesDay;
      }
      this.loadingSale = false;
    }, error => {
      this.notificationService.error('Ocurio un error al optener las ventas del dia')
      this.loadingSale = true;
    })
  }

  getWeekSales() {
    this.indexCardName = this.typesCardsSales._02_VENTA_SEMANAL_;
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const formattedOneWeekAgo = format(oneWeekAgo, 'yyyy-MM-dd');

    this.loadingSale = true;
    this.saleService.getSaleWeek(formattedOneWeekAgo).subscribe(res => {
      console.log(res);
      if (res) {
        this.salesWeek = res; // Asigna la respuesta a la propiedad correspondiente
      }
      this.loadingSale = false;
    }, error => {
      this.notificationService.error('Ocurrió un error al obtener las ventas de la semana');
      this.loadingSale = false;
    });
  }

  getMonthSales() {
    this.indexCardName = this.typesCardsSales._03_VENTA_MENSUAL_;
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const formattedOneMonthAgo = format(oneMonthAgo, 'yyyy-MM-dd');

    this.loadingSale = true;
    this.saleService.getSaleMonth(formattedOneMonthAgo).subscribe(res => {
      console.log(res);
      if (res) {
        this.salesMoth = res; // Asigna la respuesta a la propiedad correspondiente
      }
      this.loadingSale = false;
    }, error => {
      this.notificationService.error('Ocurrió un error al obtener las ventas del mes');
      this.loadingSale = false;
    });
  }

  getRankSales() {

  }
}
