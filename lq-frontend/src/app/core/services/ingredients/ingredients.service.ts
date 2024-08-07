import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs'
import { Ingredient, IngredientMap, IngredientTypeMap, IngredientUpdateMap } from '../../models/ingredients/ingredients.interface';

@Injectable({
    providedIn: 'root'
})
export class IngredientService {
  private apiUrl: string = environment.apiUrlsLQ.lq_internal;
  constructor(
    private http: HttpClient,
  ){}

  getAllIngredientsAndToppings():Observable<Ingredient[]> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredients`, {headers});
  }

 createIngredient(ingredient : IngredientMap) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.post<Ingredient>(`${this.apiUrl}/ingredients/register`, ingredient, {headers});
 }

 createTypeIngredient(ingredientType : IngredientTypeMap) {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.post<Ingredient>(`${this.apiUrl}/ingredientsType/register`, ingredientType, {headers});
 }

 updateIngredient(ingredient: IngredientUpdateMap) {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.put<Ingredient>(`${this.apiUrl}/ingredients/update`, ingredient, {headers});
 }

 desactiveIngredient(ingredientId: number) {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.put<Ingredient>(`${this.apiUrl}/ingredients/delete/${ingredientId}`, {},{headers});
 }
}