import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs';
import { User } from '../models/auth/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrlsLQ.lq_internal;
  constructor(
    private http: HttpClient,
  ){}

  signinWhithIdentificationAndPassword (document: number, password: string): Observable<User> {
    const body = {
      document,
      password
    }
    return this.http.post<User>(`${this.apiUrl}/login`, body);
  }

  saveRoleLogged(role: string) {
    if(role) {
      localStorage.setItem('isLoggedActive', 'true');
      localStorage.setItem('loggedRole', 'role');
    }
  }

  getRoleLogged(): string | null {
  return localStorage.getItem('loggedRole')
  }

  isLogged() {
    return localStorage.getItem('isLoggedActive') === 'true';
  }
}