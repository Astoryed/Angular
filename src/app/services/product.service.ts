import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../components/product/product';


@Injectable()
export class ProductService {

    private product:Product;

    private baseUrl: string="http://localhost:3000/product";
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    createProduct(product:Product){
        return this.http.post(this.baseUrl+'/create', product,{headers:this.headers});
    }

    readProduct(){
        return this.http.get(this.baseUrl+'/read',{headers:this.headers});
    }

    readBrand(){
        return this.http.get(this.baseUrl+'/readBrand',{headers:this.headers});
    }

    updateProduct(product:Product){
        return this.http.put(this.baseUrl+'/updateProduct', product,{headers:this.headers});
    }

    deleteProduct(id:string){
        return this.http.put(this.baseUrl+'/deleteProduct/'+id,{headers:this.headers});
    }

    setter(product:Product){
        this.product = product;
    }

    getter(){
        return this.product;
    }


}

