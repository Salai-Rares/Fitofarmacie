import { Routes } from '@angular/router';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RoleGuard } from './auth/role.guard';
import { ClientHeaderComponent } from './client-components/client-header/client-header.component';
import { ClientHomepageComponent } from './client-components/client-homepage/client-homepage.component';
import { ClientDetailsComponent } from './client-components/client-details/client-details.component';
import { CartComponent } from './client-components/cart/cart.component';
import { CheckoutComponent } from './client-components/checkout/checkout.component';
import { OrdersComponent } from './client-components/orders/orders.component';

export const appRoutes: Routes = [
  {
    path: 'signup',
    component: UserComponent,
    children: [{ path: '', component: SignUpComponent }],
  },
  {
    path: 'login',
    component: UserComponent,
    children: [{ path: '', component: SignInComponent }],
  },
  {
    path: 'userprofile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [RoleGuard]
  },
  {
    path:'products/:id',
    component:ProductDetailsComponent,
    canActivate: [RoleGuard]
  },
  {
    path:'home/products/:id',
    component:ClientDetailsComponent
  },
  {
    path:'products/edit/:id',
    component:ProductEditComponent,
    canActivate: [RoleGuard]
  },
  { path: 'createproduct',
    component: ProductCreateComponent,
    canActivate: [RoleGuard]
  },
  {
    path:'home',
    component:ClientHomepageComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'orders',
    component:OrdersComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

];
