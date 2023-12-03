import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductRepository } from './model/product.repository';
import { StaticDataSource } from './model/static.datasource';
import { StoreModule } from './store/store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFeatures } from './admin/material.module';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule,
    BrowserAnimationsModule,
    MaterialFeatures
    ],
  providers: [
    provideClientHydration(),
    ProductRepository,
    StaticDataSource,
    provideHttpClient(withFetch())
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
