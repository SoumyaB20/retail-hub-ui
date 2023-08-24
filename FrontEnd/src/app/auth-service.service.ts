import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { User } from './data-type';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private url =
    'http://localhost:8090/retail-hub/api/user/authentication';

   constructor(private http: HttpClient) {}
 
 
   private userSubject = new BehaviorSubject<any>(null);
   user$: Observable<any> = this.userSubject.asObservable();
   
     logout(): void {
       this.userSubject.next(null);
       localStorage.removeItem('user');
     }
   
     setLogin(userId: number) {
       this.userSubject.next(userId);
       localStorage.setItem('user', JSON.stringify(userId));
     }

  loginUser(user: User): Observable<any> {
    console.log(user);
    return this.http.get(
      `${this.url}/${user.username}?password=${user.password}`
    );
  }
}
