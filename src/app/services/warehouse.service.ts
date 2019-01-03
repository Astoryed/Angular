import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Warehouse} from '../components/warehouse/warehouse';

@Injectable()
export class WarehouseService {

    private warehouse:Warehouse;

    private baseUrl: string="http://localhost:3000/warehouse";
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    createWarehouse(warehouse:Warehouse){
        return this.http.post(this.baseUrl+'/create', warehouse,{headers:this.headers});
    }

    readWarehouse(){
        return this.http.get(this.baseUrl+'/read',{headers:this.headers});
    }

    readCity(){
        return this.http.get(this.baseUrl+'/readCity',{headers:this.headers});
    }

    updateWarehouse(warehouse:Warehouse){
        return this.http.put(this.baseUrl+'/updateWarehouse', warehouse,{headers:this.headers});
    }

    deleteWarehouse(id:string){
        return this.http.put(this.baseUrl+'/deleteWarehouse/'+id,{headers:this.headers});
    }

    setter(warehouse:Warehouse){
        this.warehouse = warehouse;
    }

    getter(){
        return this.warehouse;
    }


}
