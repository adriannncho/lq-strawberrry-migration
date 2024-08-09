import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs'
import { Product, ProductCreateMap, ProductMap, ProductUpdateMap } from '../../models/order-products/products-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsOrderService {

  private apiUrl: string = environment.apiUrlsLQ.lq_internal;
  constructor(
    private http: HttpClient,
  ){}

 getAllProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}/products`);
 }

 getProduct(numberProduct : number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/${numberProduct}`);
 }

 createProduct(product : ProductCreateMap) {
    return this.http.post<ProductCreateMap>(`${this.apiUrl}/product`, product);
 }

 updateProduct(product : ProductUpdateMap) {
    return this.http.put<ProductUpdateMap>(`${this.apiUrl}/product`, product);
 }
}