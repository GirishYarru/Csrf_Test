import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor( private httpClient:HttpClient ,private cookieService:CookieService) { }

getData(){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials':'true'
  
  }),
       
    withCredentials: true, 
   // observe: 'response' as 'response'
  }; 

  let httpHeaders = new HttpHeaders({
		'Content-Type' : 'application/json',
    'withCredentials': 'true'
	});
  

  const httpOptions1 = {
    withCredentials: true
  };

  
  return this.httpClient.get('http://127.0.0.1:81/getcountries',httpOptions)
}



addCountry(user: any) {
  return this.httpClient.post('https://127.0.0.1:81/countries', {user});
}

createArticle(): Observable<any> {
 
  
  return this.httpClient.post<any>('https://127.0.0.1:81/countries',
  {
    "area": 25,
    "capital": "Berlin1",
    "id": 5,
    "name": "hellooo"
}
  );
} 

postData():Observable<any>{
 // console.log(this.cookieService.getAll()[0].indexOf('X-CSRF-TOKEN')," --> get all cookis");




  let httpHeaders = new HttpHeaders({
		'Content-Type' : 'application/json',
    'withCredentials': 'true'
	});
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    
    
  };
  return this.httpClient.post<any>('http://127.0.0.1:81/countries',
  {
    area: 25,
    capital: "Berlin1",
    id: 5,
    name: "hellooo"
},httpOptions
  );
}

}
