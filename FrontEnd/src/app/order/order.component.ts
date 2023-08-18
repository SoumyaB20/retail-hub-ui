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
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  view(order_id: any) {
    this.router.navigate(['/orderDetails', order_id]);
  }
  productPage() {
    this.router.navigate(['/product']);
  }
}
