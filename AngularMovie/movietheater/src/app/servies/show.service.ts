import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IShow } from '../interface/Ishow.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  baseUrl:string = 'http://localhost:3004/show/'
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) { }

  //get show

  getShowByShowID(id:number):Observable<IShow>{
    return this.http.get<IShow>(this.baseUrl+id);
  }

  getShowByMovieID(id:number):Observable<any[]>{
    return this.http.get<any>(this.baseUrl+'/?movieID ='+`${id}`);
  }
}
