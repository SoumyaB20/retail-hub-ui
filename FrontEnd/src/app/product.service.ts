import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url="http://localhost:8080/product-management-service/product/product-details";
  constructor(private http:HttpClient) { }

  private authToken = '';
  setAuthToken(token: string) {
    this.authToken = token;
  }

  showProducts(): Promise<any> {
    
    console.log("called");
    return this.http.get(`${this.url}`).toPromise();
  }
  

}
