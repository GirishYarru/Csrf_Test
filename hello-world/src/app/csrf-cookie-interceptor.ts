import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemoService } from './demo.service';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
@Injectable()
export class CsrfCookieInterceptor implements HttpInterceptor{
    constructor(private demoSvc:DemoService,private tokenExtractor:HttpXsrfTokenExtractor){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        

       // if(req.method == 'POST'){
            let token = null;
           // let token1 = localStorage.getItem('X-CSRF-TOKEN');
            token=this.tokenExtractor.getToken() as string;
           // console.log('token1 is ============ ',token1)
            console.log('====token======== ',token)
            console.log('======document.cookie =========== ',document.cookie)
           // req = req.clone({headers:req.headers.set('X-CSRF-HEADER',token)})
       // }
        return next.handle(req)
    }
    
}