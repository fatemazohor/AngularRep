import { Injectable } from '@angular/core';
import { IOrderSnack } from '../interface/IOrderSnack.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderSnackService {

  baseUrl:string = "http://localhost:3004/orderSnack/"
  
  public OrderSnack!:Observable<IOrderSnack>;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute)// Creating a property with Variable http
  { }

  getOrderSnacks():Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}`);
  }
  
   getOrderSnackById(id:number):Observable<IOrderSnack>{
    return this.http.get<IOrderSnack>(`${this.baseUrl}/${id}`);
  }
  
  createOrderSnack(OrderSnack:IOrderSnack){
    return this.http.post<IOrderSnack>(`${this.baseUrl}`,OrderSnack);
  }

}
