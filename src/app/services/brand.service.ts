import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Brand} from '../components/brand/brand';

@Injectable()
export class BrandService {

    private brand:Brand;

    private baseUrl: string="http://localhost:3000/brand";
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    createBrand(brand:Brand){
        return this.http.post(this.baseUrl+'/create', brand,{headers:this.headers});
    }

    readBrand(){
        return this.http.get(this.baseUrl+'/read',{headers:this.headers});
    }

    readCategory(){
        return this.http.get(this.baseUrl+'/readCategory',{headers:this.headers});
    }

    updateBrand(brand:Brand){
        return this.http.put(this.baseUrl+'/updateBrand', brand,{headers:this.headers});
    }

    deleteBrand(id:string){
        return this.http.put(this.baseUrl+'/deleteBrand/'+id,{headers:this.headers});
    }

    setter(brand:Brand){
        this.brand = brand;
    }

    getter(){
        return this.brand;
    }


}

