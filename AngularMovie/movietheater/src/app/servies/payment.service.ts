import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPayment } from '../interface/IPayment.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl:string="http://localhost:3004/payment/"
  public Payment!:Observable<IPayment>;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute)// Creating a property with Variable http
  { }


  getPayments():Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}`);
  }
  
   getPaymentById(id:number):Observable<IPayment>{
    return this.http.get<IPayment>(`${this.baseUrl}/${id}`);
  }
  
  createPayment(Payment:IPayment){
    return this.http.post<IPayment>(`${this.baseUrl}`,Payment);
  }
}
