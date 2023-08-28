import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { AuthServiceService } from './auth-service.service';
import { cartData } from './data-type';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private taxApplied: boolean = false;
  userId: any;
  constructor(
    private http: HttpClient,
    // private authService: AuthServiceService
  ) {
    // this.authService.user$.subscribe((user) => {
    //   this.userId = user;
    // });
  }

  private cart: any[] = [];

  setCart(userId: any[] = []) {
    this.cart = userId;
    console.log(this.cart);
  }
  setTaxApplied(flag: boolean): void {
    this.taxApplied = flag;
  }

  getTaxApplied(): boolean {
    return this.taxApplied;
  }


  getCart() {
    return this.cart;
  }

  private url = 'http://localhost:8090/retail-hub/api/order';

  showCart(): Observable<any> {
    const savedUserId = localStorage.getItem('userId');
    return this.http.get(`${this.url}/cart-details?userId=${savedUserId}`);
  }

  deleteOrder(orderId: number, productId: number): Observable<any> {
    const url = `${this.url}/delete-order/${orderId}?productId=${productId}`;
    return this.http.delete(url);
  }

  addCart(cartData: cartData): Observable<object> {
    return this.http.post(`${this.url}/add-to-cart`, cartData);
  }

  sendOrderApproved(cartDetails: any[]): Observable<any> {
    console.log(cartDetails);
    return this.http.post(`${this.url}/submit-order`, cartDetails);
  }

  getOrders(): Observable<any[]> {
    const savedUserId = localStorage.getItem('userId');
    return this.http.get<any[]>(
      `${this.url}/order-details?userId=${savedUserId}`
    );
  }
}
