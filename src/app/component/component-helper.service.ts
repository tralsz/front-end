import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '../common/http-helper.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ComponentHelperService {

  constructor(private httpHelper: HttpHelperService,private _router: Router) { }

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
    if(error.error.status = 401){
      var subject = "Session Expired"
      var content = "Your session has expired. You will be redircted to login page"
    }
    this.alert(subject,content)
  }
  alert(subject, content){
    Swal.fire({
      icon: 'error',
      title: subject,
      text: content,
      // footer: '<a href="">Why do I have this issue?</a>'
    })
    if(subject == "Session Expired"){
      this._router.navigate([`login`]);
    }
  }
  get(url:any, params: HttpParams): Observable<any>{
    return this.httpHelper.get(url,params)
  }
}
