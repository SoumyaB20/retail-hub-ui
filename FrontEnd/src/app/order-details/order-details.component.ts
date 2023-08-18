import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  orderDetails: any[] = [];
  orderId!: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: CartServiceService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.orderId = parseInt(params.get('orderId') || '', 10);
      this.fetchOrderDetails();
    });
  }

  fetchOrderDetails() {
    // if (this.orderId) {
    console.log(this.orderId);
    this.orderService.getOrderDetails(this.orderId).subscribe(
      (details) => {
        this.orderDetails = details;
        console.log('Fetched order details:', this.orderDetails);
      },
      (error) => {
        console.error('Error fetching order details:', error);
        // Handle error cases
      }
    );
    // }
  }
}
