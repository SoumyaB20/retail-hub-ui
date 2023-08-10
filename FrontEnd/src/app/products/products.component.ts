import { Component } from '@angular/core';
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

  constructor(private prodService: ProductService) {}

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

  


}
