import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login/login.component';
import { TestComponent } from './test/test.component';
import {AuthGuardService} from './common/auth-guard.service'
import { ProductsComponent } from './component/products/products.component';
import { ProductsDetailsComponent } from './component/products-details/products-details.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'login'
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'products',
    canActivate: [AuthGuardService],
    component:ProductsComponent
  },
  {
    path:'products/:productId',
    canActivate: [AuthGuardService],
    component:ProductsDetailsComponent
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', useHash: !environment.production})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
