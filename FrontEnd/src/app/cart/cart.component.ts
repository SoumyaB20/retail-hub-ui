import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';

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
  totalProductPrice: number = 0; 
  orderId: number = 0;

  ngOnInit(): void {
    this.fetchCartDetails();
  }

  fetchCartDetails(): void {
    this.cartService.showCart().subscribe(data => {
      this.cartDetails = data;
      // console.log(data);
      if (this.cartDetails.length > 0) {
        this.orderId = this.cartDetails[0].orderId;
      }
      this.calculateTotalProductPrice();
    });
  }

  calculateTotalProductPrice(): void{
    this.totalProductPrice = this.cartDetails.reduce(
      (total, order) =>
        total +
        order.cartLineDetailsDTOList.reduce(
          (orderTotal: number, product: { productPrice: number; quantity: number; }) => orderTotal + product.productPrice * product.quantity,
          0
        ),
      0
    );
  }

  deleteProduct(index: number, productId: number): void {
    this.cartDetails[0].cartLineDetailsDTOList.splice(index, 1);
    this.calculateTotalProductPrice();
    // if (this.cartDetails[0].cartLineDetailsDTOList.length == 0) {
      this.cartService.deleteOrder(this.orderId, productId).subscribe(
        () => {
          console.log('Cart deleted successfully.');
          this.fetchCartDetails();
        },
        (error) => {
          console.error('Error deleting cart:', error);
        }
      );
    // }
  }

  submitOrder(): void {
    for (const order of this.cartDetails) {
      order.totalOrderValue=this.totalProductPrice;
      this.cartService.sendOrderApproved(order).subscribe(
        (responses) => {
          alert('your order has been successfully placed');
          console.log('Order and details successfully saved:', responses);
          this.router.navigate(['/product']);
        },
        (error) => {
          console.error('Error saving order and details:', error);
        }
      );
    }
  }

  onQuantityInput(event: any, index: number): void {
    const inputValue = event.target.value;
    const numericInput = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    this.cartDetails[0].cartLineDetailsDTOList[index].quantity= numericInput; // Update the cart item quantity
    this.calculateTotalProductPrice();
  }

  onQuantityKeydown(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Delete', 'Tab'];

    if (!allowedKeys.includes(event.key) && isNaN(+event.key)) {
      event.preventDefault();
    }
  }

  decrementValue(index: number, productId:number): void {
    if (this.cartDetails[0].cartLineDetailsDTOList[index].quantity > 0) {
      this.cartDetails[0].cartLineDetailsDTOList[index].quantity--;
      if(this.cartDetails[0].cartLineDetailsDTOList[index].quantity===0){
        this.cartDetails[0].cartLineDetailsDTOList.splice(index, 1);
        this.deleteProduct(index, productId);
      }
      this.calculateTotalProductPrice();
    }
  }

  incrementValue(index: number): void {
    if (this.cartDetails[0].cartLineDetailsDTOList[index].quantity < 10) {
      this.cartDetails[0].cartLineDetailsDTOList[index].quantity++;
      this.calculateTotalProductPrice();
    }
  }

}
