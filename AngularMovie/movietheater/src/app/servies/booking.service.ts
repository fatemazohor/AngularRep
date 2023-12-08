import { Injectable } from '@angular/core';
import { IBooking } from '../interface/IBooking.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl:string="http://localhost:3004/booking/"
  public Booking!:Observable<IBooking>;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute)// Creating a property with Variable http
  { }


  getBookings():Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}`);
  }
  
   getBookingById(id:number):Observable<IBooking>{
    return this.http.get<IBooking>(`${this.baseUrl}/${id}`);
  }
  getBookingByUserId(id:number):Observable<IBooking[]>{
    return this.http.get<IBooking[]>(`${this.baseUrl}/Booking/User/${id}`);
  }
  createBooking(booking:IBooking){
    return this.http.post<IBooking>(`${this.baseUrl}`,booking);
  }
  createBookingWithData(booking:IBooking){
    return this.http.post<IBooking>(`${this.baseUrl}/Booking/CreateBookingWithData`,booking);
  }




}
