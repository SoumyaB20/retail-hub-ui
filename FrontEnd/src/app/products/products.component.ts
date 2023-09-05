import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  allProducts: any[] = []; // array containing all products

  displayedProducts: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  
  searchText: string = '';
  constructor(
    private toastr: ToastrService,
    private prodService: ProductService,
    private cartService: CartServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCartDetails();
  }

  fetchCartDetails(): void {
    this.prodService.showProducts().subscribe(
      (response: any) => {
        this.allProducts = response;
        this.totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage);
        this.updateDisplayedProducts();
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.allProducts.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateDisplayedProducts();
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

  isLoading: boolean = false;

  orderId: number = 0;

  async addCart(n: any) {
    n.isLoading = true;
    try {
      const data = await this.cartService.showCart().toPromise();

      if (data.length > 0) {
        this.orderId = data[0].orderId;
      }
      const savedUserId = localStorage.getItem('userId');

      const order: cartData = {
        orderId: this.orderId,
        userId: savedUserId,
        totalOrderValue: 0,
        orderStatus: 'DRAFT',
        cartLineDetailsDTOList: [
          {
            productId: n.productId,
            productName: n.productName,
            productPrice: n.productPrice,
            quantity: 1,
          },
        ],
      };
     
      setTimeout(() => {
        this.cartService.addCart(order).subscribe(
          (responses) => {
            console.log('Order and details successfully saved:', responses);
            this.toastr.success(`You have added ${n.productName} to the cart`, 'Success');
          },
          (error) => {
            console.error('Error saving order and details:', error);
          }
        );
        n.isLoading = false;
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  search(event: any) {
    // this.searchText = event.target.value;
    this.currentPage = 1; 
    this.displayedProducts = this.filterProducts();
  }

  filterProducts(): any[] {
    const lowerCaseSearchText = this.searchText.toLowerCase();
    return this.allProducts.filter(product =>
      product.productName.toLowerCase().includes(lowerCaseSearchText) ||
      product.productCategory.toLowerCase().includes(lowerCaseSearchText)
    );
  }
}
