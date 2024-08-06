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
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.get<Product[]>(`${this.apiUrl}/products`, {headers});
 }

 getProduct(numberProduct : number): Observable<Product[]> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.get<Product[]>(`${this.apiUrl}/products/${numberProduct}`, {headers});
 }

 createProduct(product : ProductCreateMap) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.post<ProductCreateMap>(`${this.apiUrl}/product`, product, {headers});
 }

 updateProduct(product : ProductUpdateMap) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.put<ProductUpdateMap>(`${this.apiUrl}/product`, product, {headers});
 }
}