import { CompilerOptions, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs'
import { Combo, ComboMap, ComboUpdateMap } from '../../models/combos/combos.interface';

@Injectable({
  providedIn: 'root'
})
export class CombosService {

  private apiUrl: string = environment.apiUrlsLQ.lq_internal;
  constructor(
    private http: HttpClient,
  ){}

 getAllCombos(): Observable<Combo[]> {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.get<Combo[]>(`${this.apiUrl}/combo`, {headers});
 }

 getCombosActive(): Observable<Combo[]> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.get<Combo[]>(`${this.apiUrl}/combo`, {headers});
 }

 createCombo(combo : ComboMap) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.post<ComboMap>(`${this.apiUrl}/combo/register`, combo, {headers});
 }

 updateCombo(combo : ComboUpdateMap) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.put<ComboUpdateMap>(`${this.apiUrl}/combo/register`, combo, {headers});
 }

 desactiveIngredient(comboId: number) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.put<Combo>(`${this.apiUrl}/ingredients/delete/${comboId}`, {},{headers});
   }
}