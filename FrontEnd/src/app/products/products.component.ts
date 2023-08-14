import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

 
  product:Product= new Product();
  // list!:any;
  allProducts: any[] = []; // Your array containing all products
  electronicsProducts: any[] = [];
  fashionProducts: any[] = [];
  accessories: any[] = [];
  kitchenware: any[] = [];
  appliances: any[] = [];

  cUser="ni";
  constructor(private prodService: ProductService, private route:ActivatedRoute,private router:Router) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.prodService.showProducts();
      console.log(data);
      this.allProducts = data;
      this.electronicsProducts = this.allProducts.filter(product => product.category === 'Electronics');
      this.fashionProducts = this.allProducts.filter(product => product.category === 'Fashion');
      this.appliances = this.allProducts.filter(product => product.category === 'Appliances');
      this.kitchenware = this.allProducts.filter(product => product.category === 'Kitchenware');
      this.accessories = this.allProducts.filter(product => product.category === 'Accessories');
    } catch (error) {
      console.error('An error occurred:', error);
  }}

  OnCart(){
    this.router.navigate(['/cart',this.cUser])
  }

  // addCart(n: any){
  //   console.log((n));
  //   //send it to backend sucessfully
  //   alert("item added to cart");
    
  // }  
  isLoading: boolean = false;

  addCart(n:any) {
    n.isLoading = true;

    // Simulate an API call (replace with your actual API call)
    setTimeout(() => {
      // After the API call is done, hide the spinner
      n.isLoading = false;
      alert("item added to cart");
    }, 1000); // Simulating a 2-second API call
  }

  

  //fetch userid and retrive it till the end


}
