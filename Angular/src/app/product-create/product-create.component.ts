import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Product } from '../product-service/product.model';
import { ProductService } from '../product-service/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [ProductService],
})
export class ProductCreateComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  form: FormGroup;
  product: Product;
  imageData: string;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      quantity: new FormControl(null),
      price: new FormControl(null),
      description: new FormControl(null),
      image: new FormControl(null),
    });
  }
  onFileSelect(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    this.productService.addProduct(
      this.form.value.name,
      this.form.value.quantity,
      this.form.value.price,
      this.form.value.description,
      this.form.value.image
    );
    this.form.reset();
    this.imageData = null;
  }
  // onSubmit(form:NgForm){
  //   this.productService.postProduct(form.value).subscribe(
  //     res=>{

  //       this.showSucessMessage=true;
  //       setTimeout(()=>this.showSucessMessage=false,4000);
  //       this.resetForm(form);
  //     },
  //     err =>{
  //       if(err.status === 422){
  //         this.serverErrorMessages = err.error.join('</br>');
  //         console.log(this.serverErrorMessages);
  //       }
  //       else
  //       this.serverErrorMessages='Something went wrong please contact the admin!';
  //       console.log(this.serverErrorMessages);
  //     }
  //   );
  // }

  // resetForm(form:NgForm){
  //   this.productService.slectedProduct={
  //     name:'',
  //     price:0,
  //     description:'',
  //     quantity:0,
  //     image:''
  //   };
  //   form.resetForm();
  //   this.serverErrorMessages=' ';
  // }
}
