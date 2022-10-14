import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { LoginService } from './login/login.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { ProductsComponent } from './component/products/products.component';
import { ProductsDetailsComponent } from './component/products-details/products-details.component';
import { TableModule } from 'ngx-easy-table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    ProductsComponent,
    ProductsDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
