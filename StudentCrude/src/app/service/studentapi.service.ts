import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentapiService {
  baserUrl:string='http://localhost:3000/posts';
  constructor(private http:HttpClient) { }

  saveStudent(data:any){
    return this.http.put<any>(this.baserUrl,data)
    .pipe(map(res=>{return res;}))
  }
}
