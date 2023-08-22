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

export class Cart {
  product_id!: number;
  username!: String;
  product_name!: string;
  price!: number;
  NoOfItems!: number;
}

export class OrderHeader {
  orderId!: number;
  userId!: number;
  totalOrderValue!: number;
  orderStatus!: string;
}

export class OrderDetail {
  orderId!: number;
  productId!: number;
  productName!: string;
  productPrice!: number;
  quantity!: number;
}

export class Order {
  orderHeader!: OrderHeader;
  orderDetailsList!: OrderDetail[];
}