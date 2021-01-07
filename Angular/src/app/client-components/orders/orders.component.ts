import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/order-service/order.model';
import { OrderService } from 'src/app/order-service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  products: Order[] = [];
  product:Order;
  private productSubscription: Subscription;
  constructor(private orderService: OrderService,private router:Router) { }

  ngOnInit(): void {
    this.orderService.getProducts();
    this.productSubscription = this.orderService
      .getProductsStream()
      .subscribe((products: Order[]) => {
        this.products = products;
        console.log(this.products);
      });
  }

}
