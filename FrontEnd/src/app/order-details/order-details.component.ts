import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  orderDetails: any[] = [];
  orderId!: any;
  index!: any;
  total!: any;
  // taxApplied: boolean = false;

  constructor(
    private cartService: CartServiceService,
    private orderService: CartServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let OrderId = params.get('OrderId');
      let index = params.get('index');
      this.index = index;
      this.orderId = OrderId;
    });
    
    // this.taxApplied = this.cartService.getTaxApplied();
    this.orderDetails = this.orderService.getCart();
  }

  OrdersPage() {
    this.router.navigate(['/orders']);
  }
}
