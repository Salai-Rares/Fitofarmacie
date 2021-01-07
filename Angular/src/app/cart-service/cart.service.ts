import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Checkout } from '../client-components/checkout/checkout.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  selectedCheckout:Checkout = {
    name:'',
    address:''
  }

  checkout(checkout:Checkout){
    return this.http.post(environment.apiBaseUrl+'/checkout',checkout);
   }
  addToCart(payload) {
    return this.http.post(`${environment.apiBaseUrl}/cartadd`, payload);
  }
  getCartItems() {
    return this.http.get(`${environment.apiBaseUrl}/getcart`);
  }
  increaseQty(payload) {
    return this.http.post(`${environment.apiBaseUrl}/cartadd`, payload);
  }
  decreaseQty(payload){
    return this.http.post(`${environment.apiBaseUrl}/cartremove`, payload);
  }
  emptyCart() {
    return this.http.delete(`${environment.apiBaseUrl}/deletecart`);
  }

}
