import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../components/category/category';


@Injectable()
export class CategoryService {

    private category:Category;

    private baseUrl: string="http://localhost:3000/category";
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    createCategory(category:Category){
        return this.http.post(this.baseUrl+'/create', category,{headers:this.headers});
    }

    readCategory(){
        return this.http.get(this.baseUrl+'/read',{headers:this.headers});
    }

    updateCategory(category:Category){
        return this.http.put(this.baseUrl+'/updateCategory', category,{headers:this.headers});
    }

    deleteCategory(id:string){
        return this.http.put(this.baseUrl+'/deleteCategory/'+id,{headers:this.headers});
    }

    setter(category:Category){
        this.category = category;
    }

    getter(){
        return this.category;
    }


}

