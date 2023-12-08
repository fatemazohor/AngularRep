import { Component, OnInit } from '@angular/core';
import { MoviesModel } from '../../interface/movie.model';
import { ActivatedRoute } from '@angular/router';
import { privateDecrypt } from 'crypto';
import { MovieService } from '../../servies/movie.service';
import { ShowService } from '../../servies/show.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{

  MovieId!:number;
  Movie!:MoviesModel;

  selected!: Date;
  week = new Array(7).fill(new Date());
 
  shows:any =[];

  constructor(
    private routeA:ActivatedRoute,
    private movieServ:MovieService,
    private showServ:ShowService
  ){}
  ngOnInit(): void {
    this.routeA.params.subscribe(params=> this.MovieId = params['id']);
    this.movieDetails(this.MovieId);
    this.getNextWeek();
    this.getShows();
    this.selected = new Date();
  }

  movieDetails(id:number){
    this.movieServ.getMovieById(id).subscribe((movieResult)=>
    {this.Movie = movieResult;
    console.log(movieResult)
   });

  }

  getNextWeek(){
    let date = new Date();
     for(let i =0;i<7;i++){
       this.week[i] = new Date(date.getFullYear(),date.getMonth(),(date.getDate()+i));
      
     }
 
   }
  

   getShows(){
    this.showServ.getShowByMovieID(this.MovieId).subscribe((showResult)=>
    { console.log(showResult);
      this.shows = showResult;
    })
  }




}
