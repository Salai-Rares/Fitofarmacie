import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Product } from 'src/app/product-service/product.model';
import { ProductService } from 'src/app/product-service/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
})
export class ProductGridComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  product:Product;
  private productSubscription: Subscription;
  constructor(private productService: ProductService,private router:Router) {}

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
    this.router.navigate(['/products',product._id])
  }
}
