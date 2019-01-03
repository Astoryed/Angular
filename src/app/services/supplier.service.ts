import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Supplier} from '../components/supplier/supplier';

@Injectable()
export class SupplierService {

  private supplier:Supplier;

  private baseUrl: string="http://localhost:3000/supplier";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createSupplier(supplier:Supplier){
    return this.http.post(this.baseUrl+'/create', supplier,{headers:this.headers});
  }

  readSupplier(){
    return this.http.get(this.baseUrl+'/read',{headers:this.headers});
  }

  updateSupplier(supplier:Supplier){
    return this.http.put(this.baseUrl+'/updateSupplier', supplier,{headers:this.headers});
  }

  deleteSupplier(id:string){
    return this.http.put(this.baseUrl+'/deleteSupplier/'+id,{headers:this.headers});
  }

  setter(supplier:Supplier){
    this.supplier = supplier;
  }

  getter(){
    return this.supplier;
  }
}

