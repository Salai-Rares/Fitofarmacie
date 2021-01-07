import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/product-service/product.model';
import { ProductService } from 'src/app/product-service/product.service';

@Component({
  selector: 'app-client-grid',
  templateUrl: './client-grid.component.html',
  styleUrls: ['./client-grid.component.css']
})
export class ClientGridComponent implements OnInit {
  products: Product[] = [];
  product:Product;
  private productSubscription: Subscription;
  constructor(private productService: ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.productSubscription = this.productService
      .getProductsStream()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
  onSelect(product) {
    this.router.navigate(['/home/products',product._id])
  }

}
