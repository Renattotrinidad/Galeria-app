import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	private url:string;

  constructor(
  	private _http:HttpClient
  	) { 
  		this.url = Global.url;}

  login(usuario:any, getToken?:boolean):any{
    if (getToken) {
      usuario.token = getToken;
    }

  	let headers:HttpHeaders = new HttpHeaders({'Content-Type':'Application/json'});
  	return this._http.post(this.url+"login",usuario,{headers:headers}).toPromise()
  	.then(res=>res);
  }
}
