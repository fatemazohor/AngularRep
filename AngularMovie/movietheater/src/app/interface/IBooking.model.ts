import { IShow } from "./Ishow.model"; 
import { IShowSeat } from "./IshowSea.model";

export interface IBooking
{
  bookingID?:number;
  numberOfSeats:number,
  timeStamp:Date,
  status:number,
  userID:number,
  showID:number
}