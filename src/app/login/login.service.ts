import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHelperService } from '../common/http-helper.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl;
  constructor(private httpHelper: HttpHelperService) { }

  login(userDetails:any): Observable<any>{
    console.log(1)
    return this.httpHelper.post(this.baseUrl + "/User/Authenticate", userDetails)
  }
}
