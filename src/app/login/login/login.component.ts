import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = {
    username: '',
    password: ''
  };
  showError = false;
  constructor(private loginService: LoginService,
    private _router: Router,) { }

  ngOnInit(): void {
  }

  login(){

    this.loginService.login(this.loginForm).subscribe(resp=>{
      if(resp.body){
        this.showError = false;
        sessionStorage.setItem('token', resp.body);
        this._router.navigateByUrl('/products')
      }
    },error=>{
      if(error.error.status = 401){
        this.showError = true
      }
    })  
  }

}
