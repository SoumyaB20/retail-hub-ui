import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  protected flag = false;
  successMessage: string = '';
  showTaxDialog: boolean = false;
  taxApplied: boolean = false;
  

  constructor(
    private cartService: CartServiceService,
    private router: Router
  ) {}

  cartDetails: any[] = [];
  totalProductPrice: number = 0; 
  orderId: number = 0;


  ngOnInit(): void {
    this.fetchCartDetails();
  }

  openTaxDialog(): void {
    this.showTaxDialog = true;
  }
  
  closeTaxDialog(): void {
    this.showTaxDialog = false;
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
    if (this.totalProductPrice > 500) {
      this.openTaxDialog();
    } else {
      this.finalizeOrder();
    }
  }
  
  applyTaxAndSubmit(): void {
    this.totalProductPrice += 10; // Add extra charges
    this.closeTaxDialog();
    this.cartService.setTaxApplied(true); 
    this.finalizeOrder();
    
  }

  finalizeOrder(): void {

    const successfulOrders = [];
    for (const order of this.cartDetails) {
      order.totalOrderValue=this.totalProductPrice;
      this.cartService.sendOrderApproved(order).subscribe(
        (response) => {
          successfulOrders.push(response);
        if (successfulOrders.length === this.cartDetails.length) {
          this.showAlertAndNavigate();
        }
      },
      (error) => {
        console.error('Error saving order and details:', error);
      }
    );
  }
}

showAlertAndNavigate(): void {
  this.successMessage = 'Your order has been successfully placed';

  setTimeout(() => {
    this.successMessage = '';
    this.router.navigate(['/product']);
  }, 2000); 
}

  onQuantityInput(event: any, index: number): void {
    const inputValue = event.target.value;
    const numericInput = inputValue.replace(/[^0-9]/g, ''); 
    this.cartDetails[0].cartLineDetailsDTOList[index].quantity= numericInput; 
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
  productPage() {
    this.router.navigate(['/product']);
  }


}
