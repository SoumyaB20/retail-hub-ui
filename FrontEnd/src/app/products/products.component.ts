import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { CartServiceService } from '../cart-service.service';
import { cartData, Product } from '../data-type';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})

export class ProductsComponent {
  product: Product = new Product();
  // list!:any;
  allProducts: any[] = []; // Your array containing all products
  electronicsProducts: any[] = [];
  // fashionProducts: any[] = [];
  // accessories: any[] = [];
  // kitchenware: any[] = [];
  // appliances: any[] = [];

  searchText: string = '';
  constructor(
    private prodService: ProductService,
    private cartService: CartServiceService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCartDetails();
  }

  fetchCartDetails(): void {
    this.prodService.showProducts().subscribe(
      (response: any) => {
        this.allProducts = response;
        // this.electronicsProducts = this.allProducts.filter(
        //   (product) => product.category === 'Electronics'
        // );
        // this.fashionProducts = this.allProducts.filter(
        //   (product) => product.category === 'Fashion'
        // );
        // this.appliances = this.allProducts.filter(
        //   (product) => product.category === 'Appliances'
        // );
        // this.kitchenware = this.allProducts.filter(
        //   (product) => product.category === 'Kitchenware'
        // );
        // this.accessories = this.allProducts.filter(
        //   (product) => product.category === 'Accessories'
        // );
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );
  }

  OnCart() {
    this.router.navigate(['/cart']);
  }
  login() {
    this.router.navigate(['/login']);
  }
  viewOrders() {
    this.router.navigate(['/orders']);
  }

  // addCart(n: any){
  //   console.log((n));
  //   //send it to backend sucessfully
  //   alert("item added to cart");

  // }
  isLoading: boolean = false;

  orderId: number = 0;  
  
  async addCart(n: any) {
    n.isLoading = true;
    try {
      const data = await this.cartService.showCart().toPromise();
      // console.log(data);
      
      if (data.length > 0) {
        this.orderId = data[0].orderId;
      }
      // console.log("just saving oID:", this.orderId);
      
      const order: cartData = {
        orderId: this.orderId,
        userId: 2,
        totalOrderValue: 0,
        orderStatus: "DRAFT",
        cartLineDetailsDTOList: [
          {
            productId: n.productId,
            productName: n.productName,
            productPrice: n.productPrice,
            quantity: 1
          }
        ]
      };
      
      // console.log("after set:", order);
      
    setTimeout(() => {
      this.cartService.addCart(order).subscribe(
        (responses) => {
          console.log('Order and details successfully saved:', responses);
        },
        (error) => {
          console.error('Error saving order and details:', error);
        }
      );
      n.isLoading = false;
    }, 1000); 
      
      // Now you can continue with the rest of your logic using the 'order' object
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately
    }
  }
  
  add3Cart(n: any) {
    
    this.cartService.showCart().subscribe(data => {
      // this.cartDetails = data;
      console.log(data);
      if (data.length > 0) {
        this.orderId = data[0].orderId;
      }
      console.log("just saving oID:",this.orderId);
    });
  

    const order: cartData = {
        orderId: this.orderId,
        userId: 2,
        totalOrderValue: 0,
        orderStatus: "DRAFT",
        cartLineDetailsDTOList: [
        {
          productId: n.productId,
          productName: n.productName,
          productPrice: n.productPrice,
          quantity: 1
        }
      ]
    };
    console.log("after set:",order);
    
    n.isLoading = true;
    setTimeout(() => {
      this.cartService.addCart(order).subscribe(
        (responses) => {
          console.log('Order and details successfully saved:', responses);
        },
        (error) => {
          console.error('Error saving order and details:', error);
        }
      );
      n.isLoading = false;
    }, 1000); 
  }

  search(event: any) {
    this.searchText = event.target.value;
    // console.log(this.searchText);
  }
}
