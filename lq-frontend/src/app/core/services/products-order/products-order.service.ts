import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs'
import { Product } from '../../models/order-products/products-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsOrderService {

  private apiUrl: string = environment.apiUrlsLQ.lq_internal;
  constructor(
    private http: HttpClient,
  ){}

 getAllProducts(): Observable<Product[]> {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.get<Product[]>(`${this.apiUrl}/products`, {headers});
 }
}