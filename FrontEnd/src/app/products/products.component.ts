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
  list!:any;
  constructor(private prodService: ProductService) {
    
  }

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.prodService.showProducts();
      console.log(data);
      this.list = data;
    } catch (error) {
      console.error('An error occurred:', error);
  }}


}
