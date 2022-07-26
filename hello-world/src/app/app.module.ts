import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
//import { HttpXsrfInterceptor } from './HttpXsrfInterceptor';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpXsrfTokenExtractor} from '@angular/common/http';
import { HttpClientXsrfModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { CsrfCookieInterceptor } from './csrf-cookie-interceptor';
//import { HttpXsrfInterceptor } from './HttpXsrfInterceptor';
//import { HttpXsrfCookieExtractor } from './HttpXsrfCookieExtractor';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { InjectionToken } from '@angular/core';
//import { CookieService } from './CookieService';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
export const XSRF_COOKIE_NAME: InjectionToken<string> = new InjectionToken<string>('X-CSRF-HEADER');

export const XSRF_HEADER_NAME: InjectionToken<string> = new InjectionToken<string>('X-CSRF-TOKEN');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      
      cookieName: 'X-CSRF-TOKEN',

      headerName: 'X-CSRF-HEADER',

    }),
    RouterModule,
    AppRoutingModule
  ],
// providers: [
//   HttpXsrfCookieExtractor,

//               HttpXsrfInterceptor,
              
//               { provide: XSRF_COOKIE_NAME, useValue: 'X-CSRF-HEADER' },

//               { provide: XSRF_HEADER_NAME, useValue: 'X-CSRF-TOKEN' },

//               { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },

//               { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },

// ],
 providers:[{ provide: HTTP_INTERCEPTORS, useClass: CsrfCookieInterceptor, multi: true }],
// providers:[CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
