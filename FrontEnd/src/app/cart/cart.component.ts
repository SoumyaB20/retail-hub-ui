import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { Cart } from '../data-type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(
    private cartService: CartServiceService,
    private router: Router
  ) {}

  total!: any;
  cartDetails: any[] = [];
  cart: Cart = new Cart();

  ngOnInit(): void {
    this.fetchCartDetails();
  }

  fetchCartDetails(): void {
    this.cartService.showCart().subscribe(
      (response: any) => {
        // Assuming the API response contains cart items in response.cartItems
        // this.cartDetails = response.cartItems;
        console.log(this.cartDetails);
        this.cartDetails = response;
        console.log(this.cartDetails);
        this.total = this.cartDetails.reduce(
          (sum, item) => sum + item.price * item.NoOfItems,
          0
        );
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );
  }

  deleteProduct(productId: number) {
    this.cartService.deleteProductForUser(productId).subscribe(
      () => {
        console.log('Cart deleted successfully.');
        this.fetchCartDetails();
      },
      (error) => {
        console.error('Error deleting cart:', error);
      }
    );
  }

  submitOrder() {
    alert('your order has been successfully placed');
    this.router.navigate(['/product']);
    this.cartService.postOrder(this.cartDetails).subscribe(
      (response) => {
        console.log('Order successfully submitted:', response);
        this.router.navigate(['/product']);
      },
      (error) => {
        console.error('Error submitting order:', error);
      }
    );
  }

  incrementValue() {}
  decrementValue() {}
}
