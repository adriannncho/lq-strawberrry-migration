import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs'
import { Order } from '../../models/orders/orders.interface';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
  private apiUrl: string = environment.apiUrlsLQ.lq_internal;
  constructor(
    private http: HttpClient,
  ){}

 getAllOrdersPendings(): Observable<Order[]> {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.get<Order[]>(`${this.apiUrl}/ordersPending`, {headers});
 }

 getOrderPending(numberOrder : number): Observable<Order> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.get<Order>(`${this.apiUrl}/ordersPending/${numberOrder}`, {headers});
 }
}