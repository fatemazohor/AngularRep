import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { ProductRepository } from './model/product.repository';
import { StaticDataSource } from './model/static.datasource';
import { StoreModule } from './store/store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    
    // StoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule,
    BrowserAnimationsModule,
    
    
  ],
  providers: [
    provideClientHydration(),
    ProductRepository,
    StaticDataSource
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
