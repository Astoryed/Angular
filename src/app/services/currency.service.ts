import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Currency} from '../components/currency/currency';


@Injectable()
export class CurrencyService {

    private currency:Currency;

    private baseUrl: string="http://localhost:3000/currency";
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    createCurrency(currency:Currency){
        return this.http.post(this.baseUrl+'/create', currency,{headers:this.headers});
    }

    readCurrency(){
        return this.http.get(this.baseUrl+'/read',{headers:this.headers});
    }

    updateCurrency(currency:Currency){
        return this.http.put(this.baseUrl+'/updateCurrency', currency,{headers:this.headers});
    }

    deleteCurrency(id:string){
        return this.http.put(this.baseUrl+'/deleteCurrency/'+id,{headers:this.headers});
    }

    setter(currency:Currency){
        this.currency = currency;
    }

    getter(){
        return this.currency;
    }


}

