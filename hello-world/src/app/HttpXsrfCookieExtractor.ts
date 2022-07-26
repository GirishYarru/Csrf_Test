// import { InjectionToken } from '@angular/core';

// import { Observable } from 'rxjs';

// import { HttpHandler } from '@angular/common/http';

// import { HttpInterceptor } from '@angular/common/http';

// import { HttpRequest , HttpResponse} from '@angular/common/http';

// import { HttpEvent } from '@angular/common/http';

// import { HttpXsrfTokenExtractor } from '@angular/common/http';

// import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';

// import { HttpClient } from '@angular/common/http';

// import {DOCUMENT, ɵparseCookieValue as parseCookieValue} from '@angular/common';


// export const XSRF_COOKIE_NAME: InjectionToken<string> = new InjectionToken<string>('X-CSRF-HEADER');

// export const XSRF_HEADER_NAME: InjectionToken<string> = new InjectionToken<string>('X-CSRF-TOKEN');


// @Injectable()

// export class HttpXsrfCookieExtractor implements HttpXsrfTokenExtractor {

//   private lastCookieString: string|null = '';

//   private lastToken: string = '';

//   private parseCount: number = 0;

//   private MAX_RETRIES: number = 5;


//   constructor(

//       @Inject(DOCUMENT) private doc: any, @Inject(PLATFORM_ID) private platform: string,

//       @Inject(XSRF_COOKIE_NAME) private cookieName: string, private httpClient: HttpClient) {}


//   //make a HEAD request to retrieve the cookie

//   headRequest(): Promise<any> {
//     let promise = new Promise<void>((resolve, reject) => { 
//         console.log('head request:');
//         this.httpClient.head('/', {observe: 'response'})
//         .toPromise()
//         .then(
//             response => {
//                 console.log('headRequest resolved',response);
//                 response?.headers.get('');
//                 let cookieValue = response?.headers.get(this.cookieName);
//                 this.lastCookieString=cookieValue||null;//”X-CSRF-TOKEN”
//                 //response?.headers.get(this.lastCookieString||'')
//                 let headerValue = response?.headers.get(this.lastCookieString||'');
//                 this.lastToken=headerValue||'';
//                 resolve();
//         }
//         ).catch(
//             err => {
//                 console.log('headRequest rejected');
//                 reject();
//                 }
//         );        
//     });


//     return promise;

//   }


//   getToken(): string|null {


//     if (this.platform === 'server') {//it should be ‘browser’

//       return null;

//     }


//     do {

//         console.log('retrying HEAD');

//         this.parseCount++;

//         console.log('expecting the promise: headRequest()');

//         this.headRequest();

//         } while(this.lastToken==null && this.parseCount < this.MAX_RETRIES);


//     return this.lastToken;

//   }  

// }
