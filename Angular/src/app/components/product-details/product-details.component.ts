import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product-service/product.model';
import { ProductService } from 'src/app/product-service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:Product = {_id:'',name:'',quantity:null,price:null,description:'',image:''};

  constructor(private route: ActivatedRoute,private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.getProductDetails(this.route.snapshot.params.id);
  }
  getProductDetails(id:string){
    this.productService.getProductDetalis(id).subscribe((data:any)=>{
      this.product=data;
      console.log(this.product);
    })
  }
  productEdit(){
    window.location.replace(`/products/edit/${this.product._id}`)
  }
  productDelete(){
    var result = confirm("Want to delete?");
    if(result){
    this.productService.deleteProduct(this.product._id);
    window.location.replace('/homepage')}
  }

}
