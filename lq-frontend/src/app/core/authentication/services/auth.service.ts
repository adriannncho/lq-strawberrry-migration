import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrlsLQ.lq_internal;

  constructor(
    private http: HttpClient,
  ){}

  signinWhithIdentificationAndPassword (document: number, password: string): Observable<any> {
    const body = {
      document,
      password
    }
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}