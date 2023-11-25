import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  baseUrl:string="http://localhost:3000/posts/";
  constructor(private http:HttpClient) { }

  traninePost(data:any){
    return this.http.post<any>(this.baseUrl, data)
    .pipe(map(res=>{
      return res;
    }))
  }

  traineGet(){
    return this.http.get<any>(this.baseUrl)
    .pipe(map(res=>{
      return res;
    }))
  }
  traineDelete(id:number){
    return this.http.delete<any>(this.baseUrl + id)
    .pipe(map(res=>{
      return res;
    }))
  }
  traineEdit(id:number, data:any){
    return this.http.put<any>(this.baseUrl + id, data)
    .pipe(map(res=>{
      return res;
    }))
  }

  
}
