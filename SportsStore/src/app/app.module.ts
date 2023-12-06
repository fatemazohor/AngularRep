import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductRepository } from './model/product.repository';
import { StaticDataSource } from './model/static.datasource';
import { StoreModule } from './store/store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFeatures } from './admin/material.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
// import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule,
    BrowserAnimationsModule,
    MaterialFeatures,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
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
