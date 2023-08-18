import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Cart } from './data-type';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private url = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private userService: AuthServiceService
  ) {}

  showCart(): Observable<any> {
    return this.http.get(`${this.url}/cart`);
  }

  //  deleteCartForUser(userId: string, productId: number): Observable<any> {
  //   const url = `${this.url}/cart?username=${userId}`;
  //   return this.http.delete(url);
  // }

  // private url="http://localhost:9091/order-management-service/order";
  // constructor(private http: HttpClient, private userService:AuthServiceService) { }

  // showCart(): Observable<any> {
  //   const userId = this.userService.getUserId;
  //   return this.http.get(`${this.url}/cart-details?userId=${userId}`);
  // }

  deleteProductForUser(productId: number): Observable<any> {
    const userId = this.userService.getUserId;
    const url = `${this.url}/delete-order?userId=${userId}?productId=${productId}`;
    return this.http.delete(url);
  }

  addCart(c: Cart): Observable<object> {
    console.log(c);
    return this.http.post(`${this.url}/cart`, c);
  }

  postOrder(orderData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.url}/api/orders`, orderData, { headers });
  }
  updateOrderStatus(orderId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Send a PUT request to update the order status to "success"
    return this.http.put(
      `${this.url}/api/orders/${orderId}`,
      { status: 'approved' },
      { headers }
    );
  }

  saveOrderAndDetails(orderData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Step 1: Save the order with draft status
    const orderRequest = this.http.post(
      `${this.url}/api/orders`,
      { ...orderData, status: 'draft' },
      { headers }
    );

    // Step 2: Save the order details
    const orderDetailsRequest = this.http.post(
      `${this.url}/api/order-details`,
      { headers }
    );

    // Combine both requests and return as a single Observable
    return forkJoin([orderRequest, orderDetailsRequest]);
  }

  getOrders(): Observable<any[]> {
    const userId = this.userService.getUserId;
    return this.http.get<any[]>(`${this.url}/orders`);
  }

  getOrderDetails(orderId: number): Observable<any[]> {
    // return this.http.get<any[]>(`${this.url}/order_deatils/${orderId}`);
    return this.http.get<any[]>(`${this.url}/order_deatils`);
  }
}
