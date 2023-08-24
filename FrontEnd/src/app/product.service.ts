import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:8090/retail-hub/api/product/product-details';
  constructor(private http: HttpClient) {}

  showProducts(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
}
