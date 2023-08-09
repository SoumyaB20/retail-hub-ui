import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from './data-type';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = 'https://jsonplaceholder.typicode.com';

  private loggedIn = false;

  constructor(private http: HttpClient) {}

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  loginUser(user: User): Observable<object>{
    console.log(user);
    this.loggedIn = true; // assuming
    return this.http.post(`${this.url}/users`, user);
  }
  
}