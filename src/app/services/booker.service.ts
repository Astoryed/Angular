import { Injectable } from '@angular/core';
import {Booker} from '../components/booker/booker';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class BookerService {

  private booker:Booker;

  private baseUrl: string="http://localhost:3000/booker";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createBooker(booker:Booker){
    return this.http.post(this.baseUrl+'/create', booker,{headers:this.headers});
  }

  readBooker(){
    return this.http.get(this.baseUrl+'/read',{headers:this.headers});
  }

  updateBooker(booker:Booker){
    return this.http.put(this.baseUrl+'/updateBooker', booker,{headers:this.headers});
  }

  deleteBooker(id:string){
    return this.http.put(this.baseUrl+'/deleteBooker/'+id,{headers:this.headers});
  }

  setter(booker:Booker){
    this.booker = booker;
  }

  getter(){
    return this.booker;
  }
}
