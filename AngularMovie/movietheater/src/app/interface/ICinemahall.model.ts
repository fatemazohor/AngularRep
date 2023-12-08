import { ICinemaSeat } from "./IcinemaSeat.model"; 
import { IShow } from "./Ishow.model"; 

export interface ICinemahall
{
  cinemaHallID:number;
  name:string,
  cinemaSeats:ICinemaSeat,
  show:IShow,
  cinemaID:number,


}