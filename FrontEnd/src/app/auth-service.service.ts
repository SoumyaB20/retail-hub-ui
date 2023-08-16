import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { User } from './data-type';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = 'http://localhost:8080/product-management-service/user/authentication';

  private loggedIn = false;

  constructor(private http: HttpClient) {}

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  loginUser(user: User): Observable<any>{
    console.log(user);
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    
    // this.loggedIn = true; // assuming
    // return this.http.post(`${this.url}/users`, user);
  //   return this.http.get<string>(`${this.url}/${user.username}?password=${user.password}`)
  // }

  return this.http.get(`${this.url}/${user.username}?password=${user.password}`, { responseType: 'text' })
  
}
}