import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { Order, Product } from '../data-type';
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
    private route: ActivatedRoute,
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

  
  addCart(n: any) {
    const order: Order = {
      orderHeader: {
        orderId: 0,
        userId: 2,
        totalOrderValue: 150,
        orderStatus: "DRAFT"
      },
      orderDetailsList: [
        {
          orderId: 0,
          productId: 11,
          productName: "Product A",
          productPrice: 50,
          quantity: 2
        }
      ]
    };
    
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
    console.log(this.searchText);
  }
}
