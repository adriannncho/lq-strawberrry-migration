import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs'
import { SalesDaily, SalesMonth, SalesWeek } from '../../models/sales/sales.interface';

@Injectable({
    providedIn: 'root'
})
export class SaleService {
  private apiUrl: string = environment.apiUrlsLQ.lq_internal;
  constructor(
    private http: HttpClient,
  ){}

  getSale(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalSales`);
  }

  getSaleDaily(date: string): Observable<SalesDaily> {
    const params = new HttpParams().set('date', date);
    return this.http.get<SalesDaily>(`${this.apiUrl}/totalSalesDaily`, { params });
  }

  getSaleWeek(date: string): Observable<SalesWeek> {
    const params = new HttpParams().set('date', date);
    return this.http.get<SalesWeek>(`${this.apiUrl}/totalSalesWeek`, { params });
  }

  getSaleMonth(date: string): Observable<SalesMonth> {
  
    const params = new HttpParams().set('date', date);
    return this.http.get<SalesMonth>(`${this.apiUrl}/totalSalesMonth`, { params });
  }

  getSalesByRange(startDate: string, endDate: string): Observable<SalesMonth> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<SalesMonth>(`${this.apiUrl}/totalSalesByRange`, { params });
  }
}