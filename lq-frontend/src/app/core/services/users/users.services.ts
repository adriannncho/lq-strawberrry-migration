import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../environments/environment.local'
import { Observable } from 'rxjs'
import { User, UserMap } from '../../models/users/users.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.apiUrlsLQ.lq_internal;
  constructor(
    private http: HttpClient,
  ){}

 getAllUsers(): Observable<User[]> {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  return this.http.get<User[]>(`${this.apiUrl}/users`, {headers});
 }

 createUser(user : UserMap){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.post<UserMap>(`${this.apiUrl}/register`, user, {headers});
 }

 updateUser(user : UserMap){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.put<UserMap>(`${this.apiUrl}/updateUser`, user, {headers});
 }

 desactiveUser(userId : number){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.put<UserMap>(`${this.apiUrl}/deleteUser/${userId}`, {headers});
 }
}