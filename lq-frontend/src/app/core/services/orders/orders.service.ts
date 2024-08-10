import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs'
import { OrderResponse } from '../../models/orders/orders.interface';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
  private apiUrl: string = environment.apiUrlsLQ.lq_internal;
  constructor(
    private http: HttpClient,
  ){}

 getAllOrdersPendings(): Observable<OrderResponse[]> {
  return this.http.get<OrderResponse[]>(`${this.apiUrl}/ordersPending`);
 }

 getOrderPending(numberOrder : number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/ordersPending/${numberOrder}`);
 }

 updateOrderById(idOrder: number) {
  return this.http.put<number>(`${this.apiUrl}/order/${idOrder}`, {});
 }
}