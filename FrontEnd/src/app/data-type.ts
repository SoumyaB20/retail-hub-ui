export class User {
  username!: String;
  password!: String;
}

export class Product {
  product_id!: number;
  product_name!: string;
  price!: number;
  description!: string;
  category!: string;
  stock_quantity!: number;
}

export class cartData {
  orderId!: number;
  userId!: any;
  totalOrderValue!: number;
  orderStatus!: string;
  cartLineDetailsDTOList!: cartLineDetailsDTOList[];
}

export class cartLineDetailsDTOList {
  productId!: number;
  productName!: string;
  productPrice!: number;
  quantity!: number;
}

export class Order {
  cartData!: cartData;
  cartLineDetailsDTOList!: cartLineDetailsDTOList[];
}