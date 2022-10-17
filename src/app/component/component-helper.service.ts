import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '../common/http-helper.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ComponentHelperService {

  constructor(private httpHelper: HttpHelperService,private _router: Router) { }
  baseUrl = environment.baseUrl;
  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  errorHandler(error){
    var content;
    var subject;
    if(error.error.includes("Exist")){
      subject = "Duplicate",
      content = error.error;
    }
    else if(error.error.status = 401){
      subject = "Session Expired"
      content = "Your session has expired. You will be redircted to login page"
    }else{
      subject = "Unknown Error",
      content = "Sorry for the trouble. Please contact Admisntration"
    }
    
    this.alert('error',subject,content)
  }
  alert(status,subject, content){
    Swal.fire({
      icon: status,
      title: subject,
      text: content,
      // footer: '<a href="">Why do I have this issue?</a>'
    })
    if(subject == "Session Expired"){
      this._router.navigate([`login`]);
    }
  }
  get(url:any, params?: HttpParams): Observable<any>{
    return this.httpHelper.get(this.baseUrl + url,params)
  }

  post(url,body,params?:any):Observable<any>{
    return this.httpHelper.post(this.baseUrl + url,body,params)
  }
}
