import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from './image/image.component';

const routes: Routes = [
  {path:"image", component:ImageComponent},
  {path:"**", redirectTo:"/image"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
