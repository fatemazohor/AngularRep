import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesModel } from '../interface/movie.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaseatService {
  baseUrl:string = 'http://localhost:3004/cinemaseat/'
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) { }

  //get cinema seat

  getCinemaSeats():Observable<any[]>{
    return this.http.get<any>(this.baseUrl);
  }
  
   getMovieById(id:number):Observable<MoviesModel>{
    return this.http.get<MoviesModel>(this.baseUrl+`${id}`);
  }
}
