import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HomeComponent } from './components/home/home.component';
import { MovieTicketComponent } from './components/movie-ticket/movie-ticket.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"movielist", component:MoviesComponent},
  {path:"details/:id", component:MovieDetailsComponent},
  {path:"ticket/:movieID/show/:showID", component:MovieTicketComponent},
  {path:"**", redirectTo:"/home", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
