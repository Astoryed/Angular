import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {


  private _registerUrl = "http://localhost:3000/user/register";
  private _loginUrl = "http://localhost:3000/user/login";


  constructor(private http: HttpClient, private _router: Router, public jwtHelperService: JwtHelperService) { }


  registerUser(user){
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login/default'])
  }


    public isAuthenticated(): boolean {

        const token = localStorage.getItem('token');

        // Check whether the token is expired and return
        // true or false
        // return !this.jwtHelperService.isTokenExpired(token);
        return true;
    }



}

