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
  return this.http.get<User[]>(`${this.apiUrl}/users`);
 }

 createUser(user : UserMap){
    return this.http.post<UserMap>(`${this.apiUrl}/register`, user);
 }

 updateUser(user : UserMap){
    return this.http.put<UserMap>(`${this.apiUrl}/updateUser`, user);
 }

 desactiveUser(userId : number){
    return this.http.put<UserMap>(`${this.apiUrl}/deleteUser/${userId}`, {});
 }
}