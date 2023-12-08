import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IShow } from '../interface/Ishow.model';
import { IShowSeat } from '../interface/IshowSea.model';

@Injectable({
  providedIn: 'root'
})
export class ShowSeatService {
baseUrl:string="http://localhost:3004/showseat/"
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) { }

  //get show seat

  getShowSeats():Observable<any[]>{
    return this.http.get<any>(this.baseUrl);
  }

  getShowSeatById(id:number):Observable<IShow>{
    return this.http.get<IShow>(`${this.baseUrl}${id}`);
  }

  getShowSeatsByShowID(id:number):Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}/showID = ${id}`)
  
  }

  updateShowSeat(id:number,showSeat:IShowSeat){
    return this.http.put<IShowSeat>(`${this.baseUrl}${id}`,showSeat);
    }

}
