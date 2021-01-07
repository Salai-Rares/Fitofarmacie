import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product-service/product.model';
import { ProductService } from 'src/app/product-service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  form: FormGroup;
  product: Product;
  imageData: string;
  id:string;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      quantity: new FormControl(null),
      price: new FormControl(null),
      description: new FormControl(null),
      image: new FormControl(null),
    });
    this.id=this.route.snapshot.params.id;
    this.loadProductDetails(this.route.snapshot.params.id);
  }

  /*loadProductDetalis(productId){
    this.productService.getProductDetalis(productId).subscribe(
      res=>{
        this.productDetalis=res['product'];
      },
      err =>{
        console.log('something went wrong with getin id');
      }

    );
  }
*/
  loadProductDetails(id) {
    this.productService.getProductDetalis(id).subscribe((data: any) => {
      const picked = (({ name, quantity, price, description, image }) => ({
        name,
        quantity,
        price,
        description,
        image,
      }))(data);
      this.form.setValue(picked);
    });
  }
  onSubmit() {
    this.productService.updateProduct(
      this.id,
      this.form.value.name,
      this.form.value.quantity,
      this.form.value.price,
      this.form.value.description,
      this.form.value.image
    );
    this.imageData = null;
    window.location.replace(`products/${this.id}`);

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
}
