import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { Cart } from '../data-type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private route:ActivatedRoute, private cartService : CartServiceService ){
    
  }
  cUser:any;
  total!: any;
  cartDetails: any[] = [];
  cart:Cart= new Cart();
  async ngOnInit(): Promise<void>{

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=(params.get('id'));
      this.cUser=id;
  })
  
    try {
      const data = await this.cartService.showCart();
      console.log(data);
      this.cartDetails = data;
       
      // for( let i=0;i<this.cartDetails.length;i++){
      //   this.total = this.cart.price*this.cart.NoOfItems;
      //   console.log(this.cartDetails.price)
      // }
      this.total = this.cartDetails.reduce((sum, item) => sum + item.price*item.NoOfItems, 0);
    } 
     catch (error) {
      console.error('An error occurred:', error);
  }}

  decreaseQuantity(id: number, NoOfItems: number){
    console.log("sending api to backend to decrease: "+id + "number of items present:" + NoOfItems );
    //considering it as successful  
  }
  increaseQuantity(id: number, NoOfItems: number){
    console.log("sending api to backend to increase: "+id + "number of items present:" + NoOfItems );
    //considering it as successful  
  }
  deleteOrder(){
    this.cartService.deleteCartForUser(this.cUser).subscribe(
      () => {
        console.log('Cart deleted successfully.');
        // Perform any additional actions after successful deletion
      },
      error => {
        console.error('Error deleting cart:', error);
        // Handle error scenarios
      }
    );
  }
}

