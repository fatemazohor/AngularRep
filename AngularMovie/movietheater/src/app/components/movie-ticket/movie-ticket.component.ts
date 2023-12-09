import { Component, OnInit } from '@angular/core';
import { MoviesModel } from '../../interface/movie.model';
import { IShow } from '../../interface/Ishow.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../servies/movie.service';
import { ShowService } from '../../servies/show.service';
import { PaymentService } from '../../servies/payment.service';
import { OrderSnackService } from '../../servies/order-snack.service';
import { BookingService } from '../../servies/booking.service';
import { ShowSeatService } from '../../servies/show-seat.service';
import { CinemaseatService } from '../../servies/cinemaseat.service';
import { ProductsService } from '../../servies/products.service';
import { IShowSeat } from '../../interface/IshowSea.model';
import { IBooking } from '../../interface/IBooking.model';
import { IOrderSnack } from '../../interface/IOrderSnack.model';
import { IPayment } from '../../interface/IPayment.model';
import { CinemaHallService } from '../../servies/cinema-hall.service';
import { ICinemahall } from '../../interface/ICinemahall.model';
@Component({
  selector: 'app-movie-ticket',
  templateUrl: './movie-ticket.component.html',
  styleUrl: './movie-ticket.component.css'
})
export class MovieTicketComponent implements OnInit {


  ShowID!: number;
  MovieID!: number;
  Movie!: MoviesModel;
  Show!: IShow;
  
  ShowSeats: any = [];
  normalTicket = 0;
  totalTicketPrice = 0;
  softDrink = 0;
  popCorn = 0;
  snackMenu = 0;
  totalSnackPrice = 0;
  selected: boolean = false;
  selectedSeat: any;
  storedSeat!: IShowSeat[];
  storedSnacks: any = [];
  avialableSeat = 0;
  products: any = [];
  booking!: IBooking;
  // user!:IUser;
  orderSnack!: IOrderSnack;
  payment!: IPayment;
  paymentID!: number;
  CinemaHall!:ICinemahall;
  constructor(
    private rouite: ActivatedRoute,
    private movieContext: MovieService,
    private showContext: ShowService,
    private cinemaHallContext:CinemaHallService,
    private cinemaSeatContext: CinemaseatService,
    private showSeatContext: ShowSeatService,
    private productContext: ProductsService,
    private bookingContext: BookingService,
    // private userContext:UserService,
    private orderSnackContext: OrderSnackService,
    private paymentContext: PaymentService,
    private router: Router
  ) { }
  ngOnInit(): void {

    this.totalTicketPrice=0;
    this.rouite.params.subscribe(params => {this.MovieID = params['movieID'] , this.ShowID = params['showID']});
    this.movieDetails(this.MovieID)
   console.log(this.MovieID +" " +this.ShowID)
   this.getShow();
   this.checkIfselectedLocalStorage()

  }

  movieDetails(id: number) {
    this.movieContext.getMovieById(id).subscribe((movieResult) => {
      this.Movie = movieResult;
    });
  }

  getCinemaHall(id:number){
    this.cinemaHallContext.getCinemaHallById(id).subscribe((CinemaHallResult)=>
    {

      this.CinemaHall = CinemaHallResult;
    })
  }

  getShow() {
    this.showContext.getShowByShowID(this.ShowID).subscribe((showResult) => {
      this.Show = showResult;
      this.getCinemaHall(showResult.cinemaHallID);
      this.getShowSeats(showResult.showID);

    })
  }

  getShowSeats(id: number) {
    this.showSeatContext.getShowSeatsByShowID(id).subscribe((showSeatsResult) => {
      this.ShowSeats = showSeatsResult;
    })
  }

  onBooking() {
    // if(){}
    // else{
    //   this.router.navigate(['/login']);
    // }

    var savedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!) || [];
    this.storedSeat = savedSeats;

    if (this.normalTicket > 0 && this.storedSeat.length > 0) {
      var todayDate = new Date();
      var newbooking = this.booking = {
        status: 1,
        showID: this.Show.showID,
        timeStamp: todayDate,
        userID: 1,
        numberOfSeats: this.normalTicket
      }

      this.bookingContext.createBooking(newbooking).subscribe((bookingresult) => {
        console.log(bookingresult);
        for (var i = 0; i < this.storedSeat.length; i++) {
          this.storedSeat[i].bookingID = bookingresult.bookingID;
          this.showSeatContext.updateShowSeat(this.storedSeat[i].showSeatID, this.storedSeat[i]).subscribe();

        }
        this.onOrderSnack(bookingresult.bookingID!);
        this.onPayment(bookingresult.bookingID!);
        console.log(this.paymentID);

      });
    }
  }


  onPayment(bookingID: number) {
    var totalPrice = this.totalSnackPrice + this.totalTicketPrice;
    var newPayment = this.payment = {
      amount: totalPrice,
      timeStamp: new Date(),
      paymentMethod: 1,
      bookingID: bookingID,
      discountCuponID: 0
    }
    this.paymentContext.createPayment(newPayment).subscribe((paymentResult) => {
      console.log(paymentResult);
      this.paymentID = paymentResult.paymentID!;
      this.router.navigate(['/movie', this.MovieID, 'show', this.ShowID, 'booking', bookingID, 'ticket', this.paymentID])

    })
  }


  onOrderSnack(bookingID: number) {
    if (this.softDrink != 0) {
      var newSnacks = this.orderSnack = {
        quantity: this.softDrink,
        bookingID: bookingID,
        productID: 1
      }
      this.orderSnackContext.createOrderSnack(newSnacks).subscribe(g => console.log(g));
    }
    if (this.snackMenu != 0) {
      var newSnacks = this.orderSnack = {
        quantity: this.snackMenu,
        bookingID: bookingID,
        productID: 5
      }
      this.orderSnackContext.createOrderSnack(newSnacks).subscribe(g => console.log(g));

    }
    if (this.popCorn != 0) {
      var newSnacks = this.orderSnack = {
        quantity: this.popCorn,
        bookingID: bookingID,
        productID: 2
      }
      this.orderSnackContext.createOrderSnack(newSnacks).subscribe(g => console.log(g));

    }

  }

  checkIfselectedLocalStorage() {
    var storedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!) || [];
    if (storedSeats !== null && storedSeats.length > 0) {
      for (var i = 0; i < storedSeats.length; i++) {
        storedSeats.splice(i, 2)
        localStorage.setItem("SelectedSeats", JSON.stringify(storedSeats));

        console.log(storedSeats[i]);

      }
    }
  }

  onSelected(seat: any) {
    var storedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!) || [];
    if (seat.bookingID) {
      for (var i = 0; i < storedSeats.length; i++) {
        if (storedSeats[i].showSeatID == seat.showSeatID) {
          storedSeats.splice(i, 1);
        }
      }
    }
    // if(seat.bookingID == null){
    // }
    // else{
    //   seat.booked = true;
    // }
    if (seat.active == true && !seat.bookingID) {
      seat.active = false;
      this.avialableSeat--;
      this.totalTicketPrice = this.totalTicketPrice - seat.price;
      for (var i = 0; i < storedSeats.length; i++) {
        if (storedSeats[i].showSeatID == seat.showSeatID) {
          storedSeats.splice(i, 1);
        }
      }
      console.log(storedSeats)
      localStorage.setItem("SelectedSeats", JSON.stringify(storedSeats));
    }
    else if (this.avialableSeat < this.normalTicket && !seat.bookingID) {
      seat.active = true;
      this.avialableSeat++;
      this.totalTicketPrice = this.totalTicketPrice + seat.price;
      storedSeats.push(seat);
      localStorage.setItem("SelectedSeats", JSON.stringify(storedSeats));
    }
    console.log(seat.showSeatID);
  }


  onMinus(count: number, target: string) {
    count = count - 1;
    if (count < 0) {
      count = 0;
    }
    else {
      if (target == "normalTicket") {
        this.normalTicket = count;
      }
      else if (target == "softDrink") {
        this.softDrink = count
        this.totalSnackPrice = this.totalSnackPrice - 25;

      }
      else if (target == "popCorn") {
        this.popCorn = count
        this.totalSnackPrice = this.totalSnackPrice - 45;

      }
      else if (target == "snackMenu") {
        this.snackMenu = count
        this.totalSnackPrice = this.totalSnackPrice - 99;

      }
    }

  }
  onPlus(count: number, target: string) {
    count = count + 1;
    if (count > 9) {
      count = 9;
    }
    else {

      if (target == "normalTicket") {
        this.normalTicket = count;
      }
      else if (target == "softDrink") {
        this.softDrink = count
        this.totalSnackPrice = this.totalSnackPrice + 25;

      }
      else if (target == "popCorn") {
        this.popCorn = count
        this.totalSnackPrice = this.totalSnackPrice + 45;

      }
      else if (target == "snackMenu") {
        this.snackMenu = count
        this.totalSnackPrice = this.totalSnackPrice + 99;
      }
    }


  }










}
