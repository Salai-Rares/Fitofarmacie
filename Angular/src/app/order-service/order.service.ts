import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private orders$= new Subject<Order[]>();
  readonly url = environment.apiBaseUrl + '/orders';
  constructor(private http: HttpClient) { }
  getProducts() {
    this.http
      .get<{ products: Order[] }>(this.url)
      .pipe(
        map((productData) => {
          return productData.products;
        })
      )
      .subscribe((products) => {
        this.orders = products;
        this.orders$.next(this.orders);
      });
  }
  getProductsStream(){
    return this.orders$.asObservable();
  }
}
