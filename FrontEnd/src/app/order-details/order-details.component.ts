import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  orderDetails: any[] = [];
  orderId!: any;
  total!:any;
  constructor(
    private route: ActivatedRoute,
    private orderService: CartServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get('Oid');
      // this.total = parseInt(params.get('total') || '', 10);
      this.total = params.get('total') ;
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
    OrdersPage() {
    this.router.navigate(['/orders']);
  }
}
