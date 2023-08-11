import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './data-type';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private url="http://localhost:3000";
  constructor(private http: HttpClient) { }

  showCart(): Promise<any> {
    return this.http.get(`${this.url}/cart`).toPromise();
  }

  addCart(c: Cart): Observable<object>{
    console.log(c);
    return this.http.post(`${this.url}/cart`, c);
  }
}
