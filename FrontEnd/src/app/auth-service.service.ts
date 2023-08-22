import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { User } from './data-type';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private url =
    'http://localhost:9090/product-management-service/user/authentication';

  private loggedIn = false;
   userId: number | any;

  constructor(private http: HttpClient) {}

  logout(): void {
    this.loggedIn = false;
  }

  setLogin(userId: number) {
    this.userId = userId;
    this.loggedIn = true;
  }

  // getUserId() {
  //   return this.userId;
  // }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  loginUser(user: User): Observable<any> {
    console.log(user);
    return this.http.get(
      `${this.url}/${user.username}?password=${user.password}`
      // ,
      // { responseType: 'text' }
    );
  }
}
