import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  baseUrL:string ='http://localhost:3000/posts/';
  constructor(private http:HttpClient) { }

  saveTecher(data: any){
    return this.http.post<any>(this.baseUrL , data)
    .pipe(map(res => {return res}))

  }

  getAll(){
    return this.http.get<any>(this.baseUrL)
    .pipe(map(res => {return res}))
  }

  deleteTec(id:number){
    return this.http.delete<any>(this.baseUrL + id)
    .pipe(map(res => {return res}))
  }
  editTech(id:number, tech:any){
    return this.http.put<any>(this.baseUrL+id, tech)
    .pipe(map(res => {return res}))
  }

}
