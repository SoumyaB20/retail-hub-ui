import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //  headers= new HttpHeaders()
  // .set('content-type', 'application/json')
  // .set('Access-Control-Allow-Origin', '*');
  // private url="http://localhost:8080/product-management-service/product/product-details";
  private url =
    'http://localhost:9090/product-management-service/product/product-details';
  constructor(private http: HttpClient) {}

  private authToken = '';
  setAuthToken(token: string) {
    this.authToken = token;
  }

  showProducts(): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    headers.set('Cookie', 'JSESSIONID=12E8164760D3DE51A3FED7E8F4520085');
    // headers .set('Access-Control-Allow-Origin', '*')
    console.log(headers);
    console.log('called');
    return this.http.get(`${this.url}`, { headers });
  }
}
