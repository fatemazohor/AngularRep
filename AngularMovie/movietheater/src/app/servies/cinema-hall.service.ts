import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICinemahall } from '../interface/ICinemahall.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CinemaHallService {
  baseUrl:string ="http://localhost:3004/cinemaHall"
  public CinemaHall!:Observable<ICinemahall>;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute)// Creating a property with Variable http
  { }


  getCinemaHalls():Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}`);
  }
  
   getCinemaHallById(id:number):Observable<ICinemahall>{
    return this.http.get<ICinemahall>(`${this.baseUrl}/${id}`);
  }
}
