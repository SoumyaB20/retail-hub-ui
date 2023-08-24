import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  orders: any[] = [];
  orderId: any;

  constructor(
    private cartService: CartServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.cartService.getOrders().subscribe(
      (orders) => {
        this.orders = orders;
        console.log('Fetched orders:', this.orders);
        this.cartService.setCart(this.orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  viewOrder(orderId:number, index: number) {
    this.router.navigate(['/orderDetails', orderId, index]);
  }
  productPage() {
    this.router.navigate(['/product']);
  }
}
