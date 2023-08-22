import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Cart, Order } from './data-type';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  
  constructor(
    private http: HttpClient,
    private userService: AuthServiceService
  ) {}

   private cart: any[] = [];

  setCart(userId: any[] = []) {
    this.cart = userId;
    console.log(this.cart);
  }

  getCart() {
    return this.cart;
  }

  private url="http://localhost:9091/order-management-service/order";

  showCart(): Observable<any> {
    const userId = this.userService.userId;
    return this.http.get(`${this.url}/cart-details?userId=5`);
  }

  deleteOrder(orderId: any): Observable<any> {
    const userId = this.userService.userId;
    const url = `${this.url}/delete-order/${orderId}`;
    return this.http.delete(url);
  }

  addCart(c: Order): Observable<object> {
    console.log(c);
    return this.http.post(`${this.url}/add-to-cart`, c);
  }

  sendOrderApproved(orderId:any, cartDetails:any): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(`${this.url}/api/orders`, orderData, { headers });
    return this.http.get(`${this.url}/api/orders`);
  }

  getOrders(): Observable<any[]> {
    const userId = this.userService.userId;
    return this.http.get<any[]>(`${this.url}/details?userId=5`);
  }

}
