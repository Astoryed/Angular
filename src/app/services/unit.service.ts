import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Unit} from '../components/units/units';


@Injectable()
export class UnitService {

    private unit:Unit;

    private baseUrl: string="http://localhost:3000/unit";
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    createUnit(unit:Unit){
        return this.http.post(this.baseUrl+'/create', unit,{headers:this.headers});
    }

    readUnit(){
        return this.http.get(this.baseUrl+'/read',{headers:this.headers});
    }

    updateUnit(unit:Unit){
        return this.http.put(this.baseUrl+'/updateUnit', unit,{headers:this.headers});
    }

    deleteUnit(id:string){
        return this.http.put(this.baseUrl+'/deleteUnit/'+id,{headers:this.headers});
    }

    setter(unit:Unit){
        this.unit = unit;
    }

    getter(){
        return this.unit;
    }


}

