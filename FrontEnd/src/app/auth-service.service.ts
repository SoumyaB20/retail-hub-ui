import {
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
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
       localStorage.removeItem('userId');
     }
   
     setLogin(userId: number) {
       this.userSubject.next(userId);
       localStorage.setItem('userId', JSON.stringify(userId));
     }

  loginUser(user: User): Observable<any> {
    return this.http.get(
      `${this.url}/${user.username}?password=${user.password}`
    );
  }
}
