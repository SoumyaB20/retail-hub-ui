import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from './data-type';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = 'https://jsonplaceholder.typicode.com';

//   constructor(private http: HttpClient) { }

//   getPosts(): Promise<any> {
//     return this.http.get(`${this.url}/users`).toPromise();
//   }
// }

private loggedIn = false;

  constructor(private http: HttpClient) {}

  // login(username: string, city: string): Observable<any> {
  //   const loginData = { username, city };
  //   // Simulate a login request (replace with actual API call)
  //   // Here, we're assuming a successful login sets loggedIn to true
  //   return of('/api/login', loginData).pipe(
  //     tap(() => {
  //       this.loggedIn = true;
  //       console.log("logged in..");
  //     })
  //   );
  // }

  logout(): void {
    // Clear user token and any stored user data
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in based on token existence
    return this.loggedIn;
  }

  loginUser(user: User): Observable<object>{
    console.log(user);
    return this.http.post(`${this.url}/users`, user);
  }
  
}