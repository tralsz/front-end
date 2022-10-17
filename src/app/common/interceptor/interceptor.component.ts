import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable,  } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { LoaderService } from '../loader.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-interceptor',
  templateUrl: './interceptor.component.html',
  styleUrls: ['./interceptor.component.css']
})
export class InterceptorComponent implements HttpInterceptor  {

  constructor(private loadService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loadService.setShowLoader(true)
    return next.handle(req).pipe(
      finalize(() => this.loadService.setShowLoader(false)),
);
  }


}
