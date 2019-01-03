import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inventory} from '../components/inventory/inventory';

@Injectable()
export class InventoryService {

    private inventory:Inventory;
    public Fitems;

    private baseUrl: string="http://localhost:3000/inventory";
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    createInventory(inventory:Inventory){
        return this.http.post(this.baseUrl+'/create', inventory,{headers:this.headers});
    }

    readInventory(){
        return this.http.get(this.baseUrl+'/read',{headers:this.headers});
    }

    readFrieght(){
        return this.http.get(this.baseUrl+'/readFrieght',{headers:this.headers});
    }

    readCurrency(){
        return this.http.get(this.baseUrl+'/readCurrency',{headers:this.headers});
    }

    readProduct(){
        return this.http.get(this.baseUrl+'/readProduct',{headers:this.headers});
    }

    readUnit(){
        return this.http.get(this.baseUrl+'/readUnit',{headers:this.headers});
    }

    updateInventory(inventory:Inventory){
        return this.http.put(this.baseUrl+'/updateInventory', inventory,{headers:this.headers});
    }

    deleteInventory(id:string){
        return this.http.put(this.baseUrl+'/deleteInventory/'+id,{headers:this.headers});
    }

    setter(inventory:Inventory){
        this.inventory = inventory;
    }

    getter(){
        return this.inventory;
    }

    showLog(e){
        // console.log('From Service',e)
        this.Fitems = e;
    }

    fItems(){
        return this.Fitems;
        // console.log('From Service',Fcontainer)
    }

}
