import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Batch} from '../components/batch/batch';


@Injectable()
export class BatchService {

    private batch:Batch;

    private baseUrl: string="http://localhost:3000/batch";
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    createBatch(batch:Batch){
        return this.http.post(this.baseUrl+'/create', batch,{headers:this.headers});
    }

    readBatch(){
        return this.http.get(this.baseUrl+'/read',{headers:this.headers});
    }

    updateBatch(batch:Batch){
        return this.http.put(this.baseUrl+'/updateBatch', batch,{headers:this.headers});
    }

    deleteBatch(id:string){
        return this.http.put(this.baseUrl+'/deleteBatch/'+id,{headers:this.headers});
    }

    setter(batch:Batch){
        this.batch = batch;
    }

    getter(){
        return this.batch;
    }


}

