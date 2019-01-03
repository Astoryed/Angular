import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../components/users/user';

@Injectable()
export class UserService {

  private user:User;
  public userType;

  private baseUrl: string="http://localhost:3000/api";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createUser(user:User){
    return this.http.post(this.baseUrl+'/create', user,{headers:this.headers});
  }

  readUser(){
    return this.http.get(this.baseUrl+'/read',{headers:this.headers});
  }

  updateUser(user:User){
    return this.http.put(this.baseUrl+'/update', user,{headers:this.headers});
  }

  deleteUser(id:string){
    return this.http.put(this.baseUrl+'/delete/'+id,{headers:this.headers});
  }

  setter(user:User){
    this.user = user;
  }

  getter(){
    return this.user;
  }


}

