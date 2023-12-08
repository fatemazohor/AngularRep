import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../interface/IProduct.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl:string ="http://localhost:3004/products/"
  public Product!:Observable<IProduct>;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute)// Creating a property with Variable http
  { }

  getProducts():Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}`);
  }
  
   getProductById(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }
}
