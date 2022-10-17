import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { ProductsComponent } from './component/products/products.component';
import { ProductsDetailsComponent } from './component/products-details/products-details.component';
import { TableModule } from 'ngx-easy-table';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {ComponentHelperService} from './component/component-helper.service';
import { ButtonViewComponent } from './component/button-view/button-view.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { TableModule } from 'ngx-easy-table';
import { CardModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    ButtonViewComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SmartTableModule,
    FontAwesomeModule,
    CardModule,
    IconModule,
    BrowserAnimationsModule,
    MatTooltipModule

  ],
  providers: [LoginService,ComponentHelperService,IconSetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
