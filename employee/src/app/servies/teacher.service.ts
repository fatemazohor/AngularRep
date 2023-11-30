import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl:string ='http://localhost:3000/posts/'
  constructor(private http:HttpClient) { }

  saveTech(data:any){
    return this.http.post<any>(this.baseUrl, data)
    .pipe(res => {return res})
  }
  showTech(){
    return this.http.get<any>(this.baseUrl)
    .pipe(res => {return res})
  }
  deleteTech(id:number){
    return this.http.delete<any>(this.baseUrl + id)
    .pipe(res => {return res})
  }
  updateTech(id:number, tech:any){
    return this.http.put<any>(this.baseUrl +id , tech)
    .pipe(res => {return res})
  }


}
