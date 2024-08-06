import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs'
import { Ingredient, Order, Product } from '../../models/order-products/products-interface';
import { Combo } from '../../models/combos/combos.interface';

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

 getActiveIngredientsAndToppings():Observable<Ingredient[]> {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredientsToppingsActive`, {headers});
 }

 createOrder(order: Order) {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.post<Order>(`${this.apiUrl}/order`, order, {headers} )
 }

 getCombosActive(): Observable<Combo[]> {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.get<Combo[]>(`${this.apiUrl}/combosActive` , {headers})
 }
}