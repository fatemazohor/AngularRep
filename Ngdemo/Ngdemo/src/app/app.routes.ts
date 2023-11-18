import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

export const routes: Routes = [
    {path:"contact",component:ContactComponent},
    {path:"home",component:HomeComponent},
    {path:"menu",component:MenuComponent},
    {path:"newsletter",component:NewsletterComponent}
];
