import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { CartService } from 'src/app/cart-service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  showSuccessMessage: boolean;
  serverErrorMessages : string;

  constructor(public CartService:CartService) { }

  ngOnInit(): void {
  }
  onSubmit(form : NgForm){
    this.CartService.checkout(form.value).subscribe(
      res => {
        this.CartService.emptyCart().subscribe(()=>{
          alert('Cart Emptied');
        })
        this.showSuccessMessage=true;
        setTimeout(()=> this.showSuccessMessage = false,4000);
        this.resetForm(form);
        alert('Thank you for buying')
      },
      err => {
        if(err.status===422){
          this.serverErrorMessages=err.error.join('<br/>');
        }
        else this.serverErrorMessages = 'Something went wrong.Please contact admin!';
      }
    );
  }

    resetForm(form : NgForm){
      this.CartService.selectedCheckout = {
        name: ' ',
        address: ' '
      }
      form.resetForm();
      this.serverErrorMessages='';
    }



}
