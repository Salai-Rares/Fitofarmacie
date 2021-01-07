import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';
import { Observable, of, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  private products$= new Subject<Product[]>();
  readonly url = environment.apiBaseUrl + '/getproducts';
  readonly urlpost= environment.apiBaseUrl + '/addproduct';

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http
      .get<{ products: Product[] }>(this.url)
      .pipe(
        map((productData) => {
          return productData.products;
        })
      )
      .subscribe((products) => {
        this.products = products;
        this.products$.next(this.products);
      });
  }

  getProductsStream(){
    return this.products$.asObservable();
  }

  addProduct(name:string,quantity:string,price:string,description:string,image:File) :void {
    const productData = new FormData();
    productData.append("name",name);
    productData.append("quantity",quantity);
    productData.append("price",price);
    productData.append("description",description);
    productData.append("image",image,name);
    this.http.post<{product:Product}>(this.urlpost,productData)
    .subscribe((productData) =>{
      const product : Product = {
        _id:productData.product._id,
        name:name,
        quantity:parseInt(quantity,10),
        price:parseInt(price,10),
        description:description,
        image:productData.product.image
      }
      this.products.push(product);
      this.products$.next(this.products);
    })

  }
  getProductDetalis(id:String):Observable<Product>{
    const url = `${environment.apiBaseUrl}/getproducts/${id}`;
    return this.http.get<Product>(url).pipe(tap(_ => console.log(`fetched sales id = ${id}`)),
    catchError(this.handleError<Product>(`getProductDetails id =${id}`)));
  }
  handleError<T>(operation='operation',result?:T) {
    return (error:any) :Observable<T> =>{
      console.error(error);
      return of (result as T);
    }
  }
/*
  updateProduct(id:string,product:Product):Observable<any>{
    const url = `${environment.apiBaseUrl}/getproducts/${id}`;
    return this.http.put(url,product).pipe(
      tap(_=>console.log(`updated sales id =${id}`)),
      catchError(this.handleError<any>(`updateProduct id = ${id}`))
    )
  }
*/
  updateProduct(id:string,name:string,quantity:string,price:string,description:string,image:File|string):void{
    let productData :Product|FormData;
    if(typeof(image) == 'object'){
      productData=new FormData;
    productData.append("name",name);
    productData.append("quantity",quantity);
    productData.append("price",price);
    productData.append("description",description);
    productData.append("image",image,name);}

    else {
      productData={
        _id:id,
        name:name,
        quantity:parseInt(quantity,10),
        price:parseInt(price,10),
        image:image,
        description:description
      }
    }
    this.http.put(this.url+"/"+id,productData).subscribe((response:Product) =>{
      const updatedProducts= [...this.products];
      const oldProductIndex = updatedProducts.findIndex(p=>p._id===id);
      const prod : Product = {
        _id:response._id,
        name:name,
        quantity:parseInt(quantity,10),
        price:parseInt(price,10),
        description:description,
        image:response.image
      }
      updatedProducts[oldProductIndex] = prod;
      this.products=updatedProducts;
    })
  }

  deleteProduct(id:string):void{
    this.http.delete(this.url+"/"+id).subscribe(()=>{
      console.log(`Deleted product with id :${id}`);
    })
  }


}
