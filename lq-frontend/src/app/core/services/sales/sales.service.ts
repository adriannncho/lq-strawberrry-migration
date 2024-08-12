import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
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
    return this.http.get<SalesDaily>(`${this.apiUrl}/sales/daily`, {
      params: { date }
    });
  }

  getSaleWeek(date: string): Observable<SalesWeek> {
    return this.http.get<SalesWeek>(`${this.apiUrl}/sales/weekly`, {
      params: { date }
    });
  }

  getSaleMonth(date: string): Observable<SalesMonth> {
    return this.http.get<SalesMonth>(`${this.apiUrl}/sales/monthly`, {
      params: { date }
    });
  }

  getSalesByRange(startDate: string, endDate: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/sales/range`, {
      params: {
        startDate,
        endDate
      }
    });
  }
}