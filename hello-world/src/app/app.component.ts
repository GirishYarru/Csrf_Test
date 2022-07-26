import { Component } from '@angular/core';
import { DemoService } from './demo.service';
//import { CookieService } from './CookieService';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';
  users : any
  response:any

  constructor(private demo:DemoService,private tokenExtract:HttpXsrfTokenExtractor){}

  ngOnInit(): void{
    this.demo.getData().subscribe(books => {
      this.users = books;
    });

   // this.cookieService.setCookie('X-CSRF-TOKEN',"hello test",3,'/');
   // this.cookieService.getCookie('X-CSRF-TOKEN');
   // console.log(">>>>>>csrf token>>>>>>>> ",this.cookieService.getCookie('X-CSRF-TOKEN'))

     //this.cookieService.get('name'); // To Get Cookie

      this.demo.postData().subscribe(resp => {
        this.users = resp;
      });

      ;
      console.log(">>>>>>csrf token exrtact>>>>>>>> ",this.tokenExtract.getToken())

}}
