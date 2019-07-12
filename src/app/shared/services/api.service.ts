import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	private apiUrl = environment.apiUrl;
	private httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Accept': 'application/json'
		//   'Authorization': 'Bearer my-auth-token'
		})
	};

    constructor(private http: HttpClient) { }

    // This method is production post, but it is not working for that API, that is present in specification
    post(url, data): Promise<any> {
        const postUrl = this.apiUrl + url;
        return this.http.post(postUrl, data, this.httpOptions).toPromise();
    }
    
    // Lower method created only for TEST 
    // post(): Promise<any> {
    //   return this.http.get('http://localhost:3000/').toPromise();
    // }

     get(url): Promise<any> {
        const getUrl = this.apiUrl + url;
        return this.http.get(getUrl, this.httpOptions).toPromise();
    }

}
