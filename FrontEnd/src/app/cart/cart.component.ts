import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  sendTotal!:any;
  orderId!:number;
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
        for (const cartItem of this.cartDetails) {
           this.orderId = cartItem.orderId;
        }
        this.sendTotal = this.cartDetails.reduce(
          (sum, item) => sum + item.price * item.NoOfItems,
          0
        );
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );
  }

  deleteProduct() {
    this.cartService.deleteProductForUser(this.orderId).subscribe(
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
    this.cartService.sendOrderApproved(this.orderId, this.sendTotal).subscribe(
      (response) => {
        console.log('Order successfully submitted:', response);
        this.router.navigate(['/product']);
      },
      (error) => {
        console.error('Error submitting order:', error);
      }
    );
  }

   

  decrementValue(index: number): void {
    if (this.cartDetails[index].NoOfItems > 1) {
      this.cartDetails[index].NoOfItems--;
      this.calculateTotal();
    }
  }

  incrementValue(index: number): void {
    if (this.cartDetails[index].NoOfItems < 10) {
      this.cartDetails[index].NoOfItems++;
      this.calculateTotal();
    }
  }

  calculateTotal(): number {
    this.total = this.cartDetails.reduce(
      (acc, item) => acc + item.price * item.NoOfItems,
      0
    );
    return this.total;
  }
}
