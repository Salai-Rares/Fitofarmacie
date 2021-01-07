//built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
//components in
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

//routes
import { appRoutes } from './routes';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductService} from './product-service/product.service'
//others
import {AuthGuard} from './auth/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FeatureSliderComponent } from './components/feature-slider/feature-slider.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { BannerComponent } from './components/banner/banner.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ClientSliderComponent } from './client-components/client-slider/client-slider.component';
import { ClientHeaderComponent } from './client-components/client-header/client-header.component';
import { ClientHomepageComponent } from './client-components/client-homepage/client-homepage.component';
import { ClientGridComponent } from './client-components/client-grid/client-grid.component';
import { ClientDetailsComponent } from './client-components/client-details/client-details.component';
import { CartComponent } from './client-components/cart/cart.component';
import { CheckoutComponent } from './client-components/checkout/checkout.component';
import { OrdersComponent } from './client-components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    FeatureSliderComponent,
    ProductGridComponent,
    BannerComponent,
    BestSellerComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDetailsComponent,
    ClientSliderComponent,
    ClientHeaderComponent,
    ClientHomepageComponent,
    ClientGridComponent,
    ClientDetailsComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule

  ],
  providers: [AuthGuard,UserService,ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
