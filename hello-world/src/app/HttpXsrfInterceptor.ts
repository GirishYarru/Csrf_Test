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

// export class HttpXsrfInterceptor implements HttpInterceptor {


//   constructor(

//       private tokenService: HttpXsrfTokenExtractor,

//       @Inject(XSRF_HEADER_NAME) private headerName: string) {}


//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


//     const lcUrl = req.url.toLowerCase();

//     // Skip both non-mutating requests and absolute URLs.

//     // Non-mutating requests don’t require a token, and absolute URLs require special handling

//     // anyway as the cookie set

//     // on our origin is not the same as the token expected by another origin.

//     /*

//     if (req.method === ‘GET’ || req.method === ‘HEAD’ || lcUrl.startsWith(‘http://’) ||

//         lcUrl.startsWith(‘https://’)) {

//       return next.handle(req);

//     }

//     */    

//     if(req.method === 'HEAD'){

//         return next.handle(req);

//     }


//     const token = this.tokenService.getToken();


//     console.log('the token:' + token);

//     console.log('the URL: '+ lcUrl);

//     console.log('the header name:' + this.headerName);

//     console.log('the request method: ' + req.method);


//     if (token !== null && !req.headers.has(this.headerName)) {

//       req = req.clone({headers: req.headers

//                         .set(this.headerName, token)

//                         .set('X-Requested-With', 'XMLHttpRequest')

//                         .set('X-Login-Ajax-call','true')

//                         .set('Content-Type','application/x-www-form-urlencoded')

//     });

//     }

    

//     return next.handle(req);

//   }

// }