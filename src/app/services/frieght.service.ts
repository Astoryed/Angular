import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Frieght} from '../components/frieght/fright';

@Injectable()
export class FrieghtService {

    private frieght:Frieght;
    public Fcontainer;

    private baseUrl: string="http://localhost:3000/frieght";
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    createFrieght(frieght:Frieght){
        return this.http.post(this.baseUrl+'/create', frieght,{headers:this.headers});
    }

    readFrieght(){
        return this.http.get(this.baseUrl+'/read',{headers:this.headers});
    }

    updateFrieght(frieght:Frieght){
        return this.http.put(this.baseUrl+'/updateFrieght', frieght,{headers:this.headers});
    }

    deleteFrieght(id:string){
        return this.http.put(this.baseUrl+'/deleteFrieght/'+id,{headers:this.headers});
    }

    setter(frieght:Frieght){
        this.frieght = frieght;
    }

    getter(){
        return this.frieght;
    }

    showLog(e){
      // console.log('From Service',e)
      this.Fcontainer = e;
    }

    fContainer(){
      return this.Fcontainer;
      // console.log('From Service',Fcontainer)
    }

}
