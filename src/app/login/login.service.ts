import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '../common/http-helper.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpHelper: HttpHelperService) { }

  login(userDetails:any): Observable<any>{
    return this.httpHelper.post("https://localhost:7030/User/Authenticate", userDetails)
  }
}
