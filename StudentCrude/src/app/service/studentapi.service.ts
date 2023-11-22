import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentapiService {
  baserUrl:string='http://localhost:3000/posts/';
  constructor(private http:HttpClient) { }

  saveStudent(data:any){
    return this.http.post<any>(this.baserUrl , data)
    .pipe(map(res=>{return res;}))
  }

  getAll(){
    return this.http.get<any>(this.baserUrl)
    .pipe(map(res=>{return res}))
  }

  deleteStudent(id:number){
    return this.http.delete<any>(this.baserUrl + id)
    .pipe(map(res => {return res}))
  }

  editStudent(id:number, data:any){
    return this.http.put<any>(this.baserUrl + id, data)
    .pipe(map(res => {return res}))
  }

}
