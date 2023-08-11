export class User{
    username!: String;
    password!: String;
}

export class Product{
    product_id! : number;
    product_name! : string;
    price! : number;
    description! : string;
    category!: string;
    stock_quantity!: number;
}

export class Cart{
    product_id! : number;
    username!: String;
    product_name!: string;
    price! : number;
    NoOfItems! : number;
}