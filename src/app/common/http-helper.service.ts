import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {
  httpHeader: HttpHeaders;
  constructor(private _http: HttpClient) { }

  setHeaders() {
    this.httpHeader = new HttpHeaders();
    this.httpHeader = this.httpHeader.set('Content-Type', 'application/json');
    this.httpHeader = this.httpHeader.set('Access-Control-Allow-Origin', '*');
    this.httpHeader = this.httpHeader.set('Accept', 'application/json');
    this.httpHeader = this.httpHeader.set('Access-Control-Allow-Credentials', "true");
    this.httpHeader = this.httpHeader.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    if (sessionStorage.getItem('token') && sessionStorage.length > 0) {
      this.httpHeader = this.httpHeader.set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    }
  }
  post(url: string, data?: any, httpParams?: HttpParams) {
    console.log("yes y es yes")
    this.setHeaders()
    const req = new HttpRequest("post", url, data, { headers: this.httpHeader, params: httpParams });
    var x = this._http.request(req)
    console.log("X",x)
    return x
  }

  get(url: string, params?: HttpParams, requiredHeader?: true): Observable<any> {
    this.setHeaders()
    const req = new HttpRequest("get", url, { headers: this.httpHeader, params: params });
    return this._http.request(req);
  }

  delete(url:string, params?: HttpParams): Observable<any> {
    this.setHeaders()
    const req = new HttpRequest("DELETE",url,{ headers: this.httpHeader, params: params })
    return this._http.request(req);
  }
}
