import { Injectable } from '@angular/core';
import { Global } from './global'
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class FotografiasService {
	private url: string;
  	
  	constructor(
  		private _http: HttpClient
  	){
  		this.url = Global.url;
  	}

  	getFotografias():any{
  		return this._http.get(this.url + 'fotografias').toPromise().then(res=>res);
  	}

    getAllFotografias(token:string):any{
      let headers:HttpHeaders = new HttpHeaders({'Authorization':token});
      return this._http.get(this.url + 'all-fotografias', {headers:headers}).toPromise().then(res=>res);
    }
}