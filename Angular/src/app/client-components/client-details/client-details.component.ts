import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart-service/cart.service';

import { Product } from 'src/app/product-service/product.model';
import { ProductService } from 'src/app/product-service/product.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  product:Product = {_id:'',name:'',quantity:null,price:null,description:'',image:''};
  id:string;
  constructor(private route: ActivatedRoute,private productService:ProductService,private router:Router,private http : CartService) { }
  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.getProductDetails(this.route.snapshot.params.id);
  }
  getProductDetails(id:string){
    this.productService.getProductDetalis(id).subscribe((data:any)=>{
      this.product=data;
      console.log(this.product);
    })
  }
  _addItemToCart( id, quantity): void {
    let payload = {
      productId: id,
      quantity,
    };
    this.http.addToCart(payload).subscribe(() => {
      alert('Product Added');
    });
  }
}
